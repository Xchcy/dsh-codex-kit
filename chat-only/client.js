window.__ModuleLoader__.load({
  id: '@local/dsh-chat-only',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** Dictionary namespace owned by this plugin. */
    const NS = 'chatOnly';
    const zh = {
      'action.newChat': '仅聊天',
      'action.creating': '正在创建会话…',
      'action.failed': '创建会话失败',
      'action.hint': '不挂到任何项目，直接开始一段聊天',
      'workspace.title': '聊天',
    };
    const en = {
      'action.newChat': 'Chat only',
      'action.creating': 'Creating a session…',
      'action.failed': 'Could not create a session',
      'action.hint': 'Start a chat without attaching it to a project',
      'workspace.title': 'Chats',
    };

    const CSS = [
      '.dsh-chatonly-action{display:flex;align-items:center;gap:8px;box-sizing:border-box;width:100%;height:32px;padding:0 8px;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:20px;text-align:left;cursor:pointer;user-select:none}',
      '.dsh-chatonly-action:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-chatonly-action:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-chatonly-action[data-busy="true"]{cursor:progress;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-chatonly-icon{display:inline-flex;flex:none;justify-content:center;align-items:center;width:16px;height:20px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-chatonly-label{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
      '.dsh-chatonly-collapsed{justify-content:center;padding:0}',
    ].join('\n');

    function installCss(id, css, dispose) {
      if (typeof document === 'undefined') return;
      const existing = document.querySelector('style[data-plugin-css="' + id + '"]');
      if (existing !== null) return;
      const tag = document.createElement('style');
      tag.setAttribute('data-plugin-css', id);
      tag.textContent = css;
      document.head.appendChild(tag);
      dispose.push(() => {
        tag.remove();
      });
    }

    function PencilIcon() {
      return h(
        'svg',
        {
          width: 16,
          height: 16,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': 'true',
          style: { display: 'block' },
        },
        h('path', {
          d: 'M4 20h4l10.5-10.5a2.121 2.121 0 0 0-3-3L5 17v3Z',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinejoin: 'round',
        }),
        h('path', { d: 'M13.5 6.5 17.5 10.5', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
      );
    }

    /** Compare two absolute paths ignoring separators and Windows case. */
    function samePath(a, b) {
      const norm = (value) => String(value).replace(/\//g, '\\').replace(/\\+$/, '').toLowerCase();
      return norm(a) === norm(b);
    }

    function describeError(error) {
      if (error === null || error === undefined) return String(error);
      const parts = [];
      if (typeof error.message === 'string') parts.push(error.message);
      if (typeof error.code === 'string') parts.push('code=' + error.code);
      if (error.details !== undefined) {
        try {
          parts.push('details=' + JSON.stringify(error.details));
        } catch {
          parts.push('details=<unserialisable>');
        }
      }
      if (error.cause !== undefined && error.cause !== null) parts.push('cause=' + describeError(error.cause));
      return parts.join('\n');
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace', 'workspaces', 'remote', 'remote.directoryPicker'],
      apply(ctx) {
        const uiWorkspace = ctx.get('uiWorkspace');
        const workspaces = ctx.get('workspaces');
        const t = ctx.locale.bind(NS);
        const disposers = [];
        installCss('chat-only', CSS, disposers);
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'chat-only: dictionaries');
        ctx.effect(
          () => () => {
            for (const dispose of disposers.splice(0)) {
              try {
                dispose();
              } catch {
                /* ignore style cleanup failures */
              }
            }
          },
          'chat-only: styles',
        );

        /**
         * The Host refuses to start an ordinary new Session that belongs to no
         * Workspace: its blank hero asks for a workspace before the composer
         * unlocks. A durable "Chats" Workspace therefore backs chat-only
         * sessions, named and located by convention so sibling plugins can
         * recognise it: `<home>/.dsh/chats`.
         */
        const chatsWorkspaceId = async () => {
          const host = ctx.remote === undefined ? undefined : ctx.remote.$host;
          const home = host && typeof host.home === 'string' && host.home !== '' ? host.home : '';
          const sep = home.includes('\\') ? '\\' : '/';
          const parent = home + sep + '.dsh';
          const path = parent + sep + 'chats';
          const list = workspaces.list.getSnapshot();
          const items = Array.isArray(list.items) ? list.items : [];
          const existing = items.find((item) => samePath(item.path, path));
          if (existing !== undefined) return existing.workspaceId;
          const picker = ctx.remote === undefined ? undefined : ctx.remote.directoryPicker;
          if (picker !== undefined) {
            try {
              // Generated remotes answer with a Result envelope, not a throw.
              const result = await picker.createDirectory(parent, 'chats');
              if (result !== null && typeof result === 'object' && result.ok === false && result.error !== undefined) {
                const code = result.error.code;
                if (code !== 'directory-picker/exists' && code !== 'directory-exists') {
                  console.warn('[chat-only] could not create the chats directory:', result.error);
                }
              }
            } catch (error) {
              console.warn('[chat-only] could not create the chats directory:', error);
            }
          }
          const created = await workspaces.create({ path });
          if (created === undefined || created.workspaceId === undefined) {
            throw new Error('chat-only: workspace create returned no workspace');
          }
          try {
            await workspaces.rename(created.workspaceId, t('workspace.title'));
          } catch (error) {
            console.warn('[chat-only] could not rename the chats workspace:', error);
          }
          return created.workspaceId;
        };

        let pending = false;
        const startChat = async () => {
          if (pending) return;
          pending = true;
          let stage = 'workspace';
          try {
            const workspaceId = await chatsWorkspaceId();
            stage = 'session';
            // startSession reuses an existing blank in that workspace, so a
            // second click never piles up empty sessions.
            uiWorkspace.startSession(workspaceId);
          } catch (error) {
            const message = describeError(error);
            console.warn('[chat-only] ' + stage + ' step failed:', error);
            const wrapped = new Error(stage + ' step failed\n' + message);
            wrapped.cause = error;
            throw wrapped;
          } finally {
            pending = false;
          }
        };

        class ChatOnlyAction extends React.Component {
          constructor(props) {
            super(props);
            this.state = { busy: false, failed: '' };
            this.onClick = this.onClick.bind(this);
          }

          async onClick() {
            if (this.state.busy) return;
            this.setState({ busy: true, failed: '' });
            try {
              await startChat();
            } catch (error) {
              console.warn('[chat-only] creating a chat-only session failed:', error);
              const text = describeError(error);
              this.setState({ failed: text.split('\n')[0] });
            } finally {
              this.setState({ busy: false });
            }
          }

          render() {
            const { wide } = this.props;
            const busy = this.state.busy;
            const failed = this.state.failed !== '';
            return h(
              'button',
              {
                type: 'button',
                className: wide ? 'dsh-chatonly-action' : 'dsh-chatonly-action dsh-chatonly-collapsed',
                title: failed ? this.state.failed : t('action.hint'),
                'aria-label': t('action.newChat'),
                'aria-busy': busy ? 'true' : undefined,
                'data-busy': busy ? 'true' : 'false',
                onClick: this.onClick,
              },
              h('span', { className: 'dsh-chatonly-icon' }, h(PencilIcon, null)),
              wide
                ? h(
                    'span',
                    { className: 'dsh-chatonly-label' },
                    failed ? t('action.failed') : busy ? t('action.creating') : t('action.newChat'),
                  )
                : null,
            );
          }
        }

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            {
              name: 'sidebar.footer.action',
              id: 'chat-only.new-chat',
              order: 20,
              locale: NS,
            },
            ChatOnlyAction,
          ),
        );
      },
    };
  },
});
