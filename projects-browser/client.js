window.__ModuleLoader__.load({
  id: '@local/dsh-projects-browser',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useCallback, useEffect, useMemo, useRef, useState } = React;

    /** Dictionary namespace owned by this plugin. */
    const NS = 'projectsBrowser';
    const zh = {
      'section.projects': '项目',
      'section.pinned': '置顶',
      'section.recent': '最近',
      'section.archived': '已归档',
      'section.projects.collapse': '收起项目',
      'section.projects.expand': '展开项目',
      'section.pinned.collapse': '收起置顶',
      'section.pinned.expand': '展开置顶',
      'section.recent.collapse': '收起最近',
      'section.recent.expand': '展开最近',
      'section.archived.collapse': '收起已归档',
      'section.archived.expand': '展开已归档',
      'project.newSession': '在此项目中新建会话',
      'project.empty': '该项目暂无会话',
      'projects.add': '添加工作区',
      'projects.defaultName': '默认工作区',
      'recent.empty': '暂无会话',
      'archived.empty': '暂无已归档会话',
      'date.today': '今天',
      'date.yesterday': '昨天',
      'date.weekday.0': '星期日',
      'date.weekday.1': '星期一',
      'date.weekday.2': '星期二',
      'date.weekday.3': '星期三',
      'date.weekday.4': '星期四',
      'date.weekday.5': '星期五',
      'date.weekday.6': '星期六',
      'collapsed.expand': '展开侧边栏以浏览项目与会话',
      'error.addWorkspace': '添加工作区失败',
      'error.archive': '归档会话失败',
      'error.pin': '置顶会话失败',
      'status.running': '运行中',
      'status.approval': '等待审批',
      'status.error': '意外停止',
      'status.completed': '已完成',
      'session.untitled': '新会话',
      'menu.more': '更多操作',
      'menu.pin': '置顶会话',
      'menu.unpin': '取消置顶',
      'menu.archive': '归档会话',
      'menu.unarchive': '恢复会话',
      'archive.confirm': '「{title}」正在运行。归档会先停止它，然后移入已归档。继续吗？',
    };
    const en = {
      'section.projects': 'Projects',
      'section.pinned': 'Pinned',
      'section.recent': 'Recent',
      'section.archived': 'Archived',
      'section.projects.collapse': 'Collapse projects',
      'section.projects.expand': 'Expand projects',
      'section.pinned.collapse': 'Collapse pinned',
      'section.pinned.expand': 'Expand pinned',
      'section.recent.collapse': 'Collapse recent',
      'section.recent.expand': 'Expand recent',
      'section.archived.collapse': 'Collapse archived',
      'section.archived.expand': 'Expand archived',
      'project.newSession': 'New session in this project',
      'project.empty': 'No sessions in this project yet',
      'projects.add': 'Add workspace',
      'projects.defaultName': 'Default workspace',
      'recent.empty': 'No sessions yet',
      'archived.empty': 'No archived sessions',
      'date.today': 'Today',
      'date.yesterday': 'Yesterday',
      'date.weekday.0': 'Sunday',
      'date.weekday.1': 'Monday',
      'date.weekday.2': 'Tuesday',
      'date.weekday.3': 'Wednesday',
      'date.weekday.4': 'Thursday',
      'date.weekday.5': 'Friday',
      'date.weekday.6': 'Saturday',
      'collapsed.expand': 'Expand the sidebar to browse projects and sessions',
      'error.addWorkspace': 'Could not add the workspace',
      'error.archive': 'Could not archive the session',
      'error.pin': 'Could not pin the session',
      'status.running': 'Running',
      'status.approval': 'Waiting for approval',
      'status.error': 'Stopped unexpectedly',
      'status.completed': 'Completed',
      'session.untitled': 'New session',
      'menu.more': 'More actions',
      'menu.pin': 'Pin session',
      'menu.unpin': 'Unpin session',
      'menu.archive': 'Archive session',
      'menu.unarchive': 'Restore session',
      'archive.confirm': '"{title}" is running. Archiving stops it first and then moves it to Archived. Continue?',
    };

    const CSS = [
      '.dsh-pb-root{display:flex;flex-direction:column;gap:10px;min-height:0;overflow-y:auto;padding:2px 0 10px}',
      '.dsh-pb-root::-webkit-scrollbar{width:8px}',
      '.dsh-pb-section{display:flex;flex-direction:column;gap:1px;min-width:0}',
      '.dsh-pb-head{display:flex;align-items:center;gap:2px;height:28px}',
      '.dsh-pb-head-main{display:flex;flex:1;align-items:center;gap:6px;min-width:0;height:26px;padding:0 6px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary);font:inherit;font-size:12px;font-weight:500;cursor:pointer;user-select:none}',
      '.dsh-pb-head-main:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-head-main:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-pb-head-label{flex:1;min-width:0;overflow:hidden;text-align:left;white-space:nowrap;text-overflow:ellipsis}',
      '.dsh-pb-project{display:flex;align-items:center;gap:2px;min-width:0}',
      '.dsh-pb-chevron{display:block;flex:none;width:10px;height:10px;color:var(--dsw-alias-label-tertiary);transition:transform .12s ease}',
      '.dsh-pb-chevron[data-open="true"]{transform:rotate(90deg)}',
      '.dsh-pb-icon{display:inline-flex;flex:none;justify-content:center;align-items:center;width:16px;height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-row{display:flex;flex:1;align-items:center;gap:8px;box-sizing:border-box;min-width:0;min-height:30px;padding:0 6px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:18px;text-align:left;cursor:pointer;user-select:none}',
      '.dsh-pb-row:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-pb-row:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-pb-title{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
      '.dsh-pb-meta{flex:none;font-size:11px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-item{position:relative;display:flex;align-items:center;min-width:0}',
      '.dsh-pb-more{display:inline-flex;flex:none;justify-content:center;align-items:center;width:22px;height:22px;padding:0;border:none;border-radius:5px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;opacity:.45;transition:opacity .1s ease}',
      '.dsh-pb-item:hover .dsh-pb-more,.dsh-pb-more[data-open="true"]{opacity:1}',
      '.dsh-pb-more:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-more:focus-visible{opacity:1;outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-pb-menu{position:absolute;top:26px;right:0;z-index:40;display:flex;flex-direction:column;min-width:136px;padding:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-shadow-lv3)}',
      '.dsh-pb-menu-item{display:flex;align-items:center;gap:8px;width:100%;height:28px;padding:0 8px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;text-align:left;cursor:pointer;white-space:nowrap}',
      '.dsh-pb-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-pb-menu-icon{display:inline-flex;flex:none;justify-content:center;align-items:center;width:14px;height:14px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-pin{display:inline-flex;flex:none;justify-content:center;align-items:center;width:12px;height:12px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-nested{display:flex;flex-direction:column;gap:1px;margin-left:9px;padding-left:7px}',
      '.dsh-pb-mark{position:relative;display:inline-block;flex:none;width:10px;height:10px}',
      '.dsh-pb-mark i{position:absolute;display:block;box-sizing:border-box;width:2px;height:2px;border-radius:50%;background:var(--dsw-alias-label-tertiary);opacity:.2;animation:dsh-pb-chase 1.8s linear infinite;animation-delay:calc(var(--dsh-pb-i, 0) * -0.225s)}',
      '@keyframes dsh-pb-chase{0%{opacity:1}6%{opacity:.92}14%{opacity:.72}26%{opacity:.48}40%{opacity:.3}56%{opacity:.17}78%{opacity:.17}90%{opacity:.44}100%{opacity:1}}',
      '@media (prefers-reduced-motion: reduce){.dsh-pb-mark i{animation:none;opacity:.5}}',
      '.dsh-pb-dot{display:inline-block;flex:none;width:6px;height:6px;border-radius:50%}',
      '.dsh-pb-dot[data-tone="approval"]{background:var(--dsw-alias-state-warn-primary)}',
      '.dsh-pb-dot[data-tone="completed"]{background:var(--dsw-alias-state-business-primary)}',
      '.dsh-pb-dot[data-tone="error"]{background:var(--dsw-alias-state-error-primary)}',
      '.dsh-pb-action{display:inline-flex;flex:none;justify-content:center;align-items:center;width:22px;height:22px;padding:0;border:none;border-radius:5px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}',
      '.dsh-pb-action:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-action:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-pb-empty{padding:2px 8px 6px 31px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}',
      '.dsh-pb-rail{display:flex;flex-direction:column;align-items:center;gap:2px;padding-top:2px}',
      '.dsh-pb-error{padding:2px 8px;color:var(--dsw-alias-label-error, #d33);font-size:12px;line-height:16px}',
    ].join('\n');

    const FOLDER_ICON = h(
      'svg',
      { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h3.2c.6 0 1.2.2 1.6.6L12 7.5h6.5A2.5 2.5 0 0 1 21 10v7.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-10Z',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinejoin: 'round',
      }),
    );

    const CHAT_ICON = h(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16H9l-4.5 3.5v-13Z',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinejoin: 'round',
      }),
    );

    const PLUS_ICON = h(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', { d: 'M12 5v14M5 12h14', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
    );

    const MORE_ICON = h(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' },
      h('circle', { cx: 5, cy: 12, r: 1.6 }),
      h('circle', { cx: 12, cy: 12, r: 1.6 }),
      h('circle', { cx: 19, cy: 12, r: 1.6 }),
    );

    const PIN_ICON = h(
      'svg',
      { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M9 4h6l-1 5 3 3v2H7v-2l3-3-1-5Z',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinejoin: 'round',
      }),
      h('path', { d: 'M12 14v6', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
    );

    const ARCHIVE_ICON = h(
      'svg',
      { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M4 5h16v4H4V5Zm1 4h14v10H5V9Zm5 4h4',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
      }),
    );

    const RESTORE_ICON = h(
      'svg',
      { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M4 9a8 8 0 1 1 2 6',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
      }),
      h('path', { d: 'M4 4v5h5', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    );

    function Chevron({ open }) {
      return h(
        'svg',
        {
          className: 'dsh-pb-chevron',
          'data-open': open === true ? 'true' : 'false',
          width: 10,
          height: 10,
          viewBox: '0 0 12 12',
          fill: 'none',
          'aria-hidden': 'true',
        },
        h('path', { d: 'M4 2.5 8 6l-4 3.5', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      );
    }

    /**
     * The running mark: a square outline of eight dots. The dots stay in
     * place and a bright trail travels around the perimeter: each dot fades
     * from deep to light and then brightens again, so the deepest dot seems
     * to walk along the square with a fading tail.
     */
    function RunningMark({ label }) {
      const coords = [
        [0, 0],
        [4, 0],
        [8, 0],
        [8, 4],
        [8, 8],
        [4, 8],
        [0, 8],
        [0, 4],
      ];
      const dots = [];
      for (let index = 0; index < coords.length; index += 1) {
        dots.push(
          h('i', {
            key: String(index),
            style: { left: coords[index][0] + 'px', top: coords[index][1] + 'px', '--dsh-pb-i': String(index) },
          }),
        );
      }
      return h('span', { className: 'dsh-pb-mark', role: 'img', 'aria-label': label, title: label }, dots);
    }

    const PENDING_KINDS = ['approval', 'plan-review', 'question'];

    /** Priority rank: working, waiting for the user, unexpected stop, unread completion, the rest. */
    function rankOf(status, fallbackRunning, hasError) {
      const running = status !== undefined && status !== null ? status.running === true : fallbackRunning === true;
      if (running) return 0;
      const kind =
        status !== undefined && status !== null && status.pendingInteraction !== undefined && status.pendingInteraction !== null
          ? status.pendingInteraction.kind
          : undefined;
      if (PENDING_KINDS.includes(kind)) return 1;
      if (hasError === true) return 2;
      if (status !== undefined && status !== null && status.completionUnread === true) return 3;
      return 4;
    }

    /** Host-reported failures are not part of the session rows, so keep a client-side set. */
    function createErrorStore() {
      let ids = new Set();
      let snapshot = { ids: [], set: ids };
      const listeners = new Set();
      const publish = () => {
        ids = new Set(ids);
        snapshot = { ids: [...ids], set: ids };
        for (const listener of listeners) listener();
      };
      return {
        getSnapshot: () => snapshot,
        subscribe: (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        mark(sessionId) {
          if (ids.has(sessionId)) return;
          ids.add(sessionId);
          publish();
        },
        clear(sessionId) {
          if (!ids.has(sessionId)) return;
          ids.delete(sessionId);
          publish();
        },
      };
    }

    const INTERRUPTED_TURNS_KEY = 'dsh.projectsBrowser.interruptedTurns';

    /**
     * Turns that started but never finished leave no failure event behind: the
     * host only repairs that Session log the next time it resumes. Persist the
     * ids of running Sessions so the next page load can mark a Session whose
     * process was killed mid-turn as an unexpected stop.
     */
    function readInterruptedTurns() {
      try {
        const raw = localStorage.getItem(INTERRUPTED_TURNS_KEY);
        if (raw === null || raw === '') return {};
        const parsed = JSON.parse(raw);
        return parsed !== null && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    }

    function writeInterruptedTurns(turns) {
      try {
        localStorage.setItem(INTERRUPTED_TURNS_KEY, JSON.stringify(turns));
      } catch (error) {
        /* storage is best effort */
      }
    }

    const START_OF_DAY_CACHE = new Map();
    function startOfDay(ms) {
      const date = new Date(ms);
      const key = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      const cached = START_OF_DAY_CACHE.get(key);
      if (cached !== undefined) return cached;
      const value = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      START_OF_DAY_CACHE.set(key, value);
      return value;
    }

    function pad2(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function pathKey(value) {
      return String(value === undefined || value === null ? '' : value)
        .replace(/\//g, '\\')
        .replace(/\\+$/, '')
        .toLowerCase();
    }

    /** Chat-only sessions live in `<home>/.dsh/chats`, which is not a project. */
    function isChatsWorkspace(path) {
      return pathKey(path).endsWith('\\.dsh\\chats');
    }

    function isDefaultWorkspace(path) {
      return pathKey(path).endsWith('\\deepseek-harness\\default-workspace');
    }

    function basenameOf(path) {
      const parts = String(path === undefined || path === null ? '' : path)
        .split(/[\\/]+/)
        .filter((part) => part !== '');
      return parts.length === 0 ? '' : parts[parts.length - 1];
    }

    function localeIsZh() {
      const lang = typeof navigator !== 'undefined' && typeof navigator.language === 'string' ? navigator.language : 'en';
      return lang.toLowerCase().startsWith('zh');
    }

    function readFlag(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : raw === '1';
      } catch {
        return fallback;
      }
    }

    function useFlag(key, fallback) {
      const [value, setValue] = useState(() => readFlag(key, fallback));
      const toggle = useCallback(() => {
        const next = !readFlag(key, fallback);
        setValue(next);
        try {
          localStorage.setItem(key, next ? '1' : '0');
        } catch {
          /* storage is best effort */
        }
      }, [key, fallback]);
      return [value, toggle];
    }

    function readExpanded() {
      try {
        const raw = localStorage.getItem('dsh.projectsBrowser.expanded');
        const parsed = raw === null ? [] : JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === 'string') : [];
      } catch {
        return [];
      }
    }

    /** Closes the row menu on an outside press or Escape. */
    function useDismiss(ref, open, close) {
      useEffect(() => {
        if (!open) return undefined;
        const onDown = (event) => {
          if (ref.current !== null && !ref.current.contains(event.target)) close();
        };
        const onKey = (event) => {
          if (event.key === 'Escape') close();
        };
        document.addEventListener('mousedown', onDown, true);
        document.addEventListener('keydown', onKey, true);
        return () => {
          document.removeEventListener('mousedown', onDown, true);
          document.removeEventListener('keydown', onKey, true);
        };
      }, [ref, open, close]);
    }

    /** One session row: its main button, the state mark, and the actions menu. */
    function SessionMenu(props) {
      const { row, items, meta, mark, onOpen, t, pinnedLabel } = props;
      const ref = useRef(null);
      const [open, setOpen] = useState(false);
      const close = useCallback(() => setOpen(false), []);
      useDismiss(ref, open, close);
      return h(
        'div',
        { className: 'dsh-pb-item', ref },
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-pb-row',
            title: row.title,
            'data-session-id': row.id,
            onClick: () => {
              if (row.archived !== true) onOpen(row.id);
            },
          },
          h('span', { className: 'dsh-pb-icon' }, CHAT_ICON),
          row.pinned === true ? h('span', { className: 'dsh-pb-pin', title: pinnedLabel }, PIN_ICON) : null,
          h('span', { className: 'dsh-pb-title' }, row.title),
          mark,
          h('span', { className: 'dsh-pb-meta' }, meta),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-pb-more',
            'data-open': open ? 'true' : 'false',
            title: t('menu.more'),
            'aria-label': t('menu.more'),
            'aria-expanded': open ? 'true' : 'false',
            onClick: () => setOpen((current) => !current),
          },
          MORE_ICON,
        ),
        open
          ? h(
              'div',
              { className: 'dsh-pb-menu', role: 'menu' },
              items.map((item) =>
                h(
                  'button',
                  {
                    key: item.label,
                    type: 'button',
                    role: 'menuitem',
                    className: 'dsh-pb-menu-item',
                    onClick: () => {
                      close();
                      item.run();
                    },
                  },
                  h('span', { className: 'dsh-pb-menu-icon' }, item.icon),
                  item.label,
                ),
              ),
            )
          : null,
      );
    }

    function ProjectsBrowser(props) {
      const {
        wide,
        expandSidebar,
        useSessions,
        useWorkspaces,
        useSessionStatus,
        t,
        openSession,
        startSession,
        addWorkspace,
        errorStore,
        archiveSession,
        unarchiveSession,
        pinSession,
        unpinSession,
      } = props;
      const sessions = useSessions((snapshot) => snapshot);
      const workspaces = useWorkspaces((snapshot) => snapshot);
      const statuses = useSessionStatus((snapshot) => snapshot);
      const errors =
        errorStore === undefined || errorStore === null
          ? undefined
          : React.useSyncExternalStore(errorStore.subscribe, errorStore.getSnapshot);
      const errorSet =
        errors === undefined || errors === null || errors.set === undefined || errors.set === null ? new Set() : errors.set;
      const [projectsOpen, toggleProjectsOpen] = useFlag('dsh.projectsBrowser.projects', false);
      const [pinnedOpen, togglePinnedOpen] = useFlag('dsh.projectsBrowser.pinned', true);
      const [recentOpen, toggleRecentOpen] = useFlag('dsh.projectsBrowser.recent', true);
      const [archivedOpen, toggleArchivedOpen] = useFlag('dsh.projectsBrowser.archived', false);
      const [expanded, setExpanded] = useState(readExpanded);
      const [addError, setAddError] = useState('');
      const [actionError, setActionError] = useState('');
      const [interruptedIds, setInterruptedIds] = useState(() => new Set(Object.keys(readInterruptedTurns())));
      const runningSeen = useRef(new Set());

      const toggleProject = useCallback((workspaceId) => {
        setExpanded((current) => {
          const next = current.includes(workspaceId) ? current.filter((entry) => entry !== workspaceId) : current.concat(workspaceId);
          try {
            localStorage.setItem('dsh.projectsBrowser.expanded', JSON.stringify(next));
          } catch {
            /* storage is best effort */
          }
          return next;
        });
      }, []);

      const workspaceItems = useMemo(() => {
        const items = workspaces !== undefined && workspaces !== null && Array.isArray(workspaces.items) ? workspaces.items : [];
        return items
          .filter((item) => item !== null && typeof item === 'object' && !isChatsWorkspace(item.path))
          .slice()
          .sort((a, b) => {
            const left = typeof a.updatedAt === 'number' ? a.updatedAt : 0;
            const right = typeof b.updatedAt === 'number' ? b.updatedAt : 0;
            return right - left;
          });
      }, [workspaces]);

      const archivedIds = useMemo(() => {
        const ids = workspaces !== undefined && workspaces !== null && Array.isArray(workspaces.archivedSessionIds) ? workspaces.archivedSessionIds : [];
        return new Set(ids);
      }, [workspaces]);

      const pinnedIds = useMemo(() => {
        const ids = workspaces !== undefined && workspaces !== null && Array.isArray(workspaces.pinnedSessionIds) ? workspaces.pinnedSessionIds : [];
        return new Set(ids);
      }, [workspaces]);

      const rowOf = useCallback(
        (row, archived) => {
          const title =
            typeof row.displayTitle === 'string' && row.displayTitle !== ''
              ? row.displayTitle
              : typeof row.title === 'string' && row.title !== ''
                ? row.title
                : t('session.untitled');
          const status = statuses !== undefined && statuses !== null && typeof statuses.get === 'function' ? statuses.get(row.id) : undefined;
          const rank = rankOf(status, row.running === true, errorSet.has(row.id) || interruptedIds.has(row.id));
          return {
            id: row.id,
            title,
            archived,
            pinned: pinnedIds.has(row.id),
            updatedAt: typeof row.updatedAt === 'number' ? row.updatedAt : 0,
            rank,
            mark: archived
              ? 'none'
              : rank === 0
                ? 'running'
                : rank === 1
                  ? 'approval'
                  : rank === 2
                    ? 'error'
                    : rank === 3
                      ? 'completed'
                      : 'none',
          };
        },
        [statuses, t, errorSet, pinnedIds, interruptedIds],
      );

      const { pinnedRows, recentRows, activeRows, archivedRows } = useMemo(() => {
        const byId = sessions !== undefined && sessions !== null && sessions.byId !== null && typeof sessions.byId === 'object' ? sessions.byId : {};
        const active = [];
        const retired = [];
        for (const row of Object.values(byId)) {
          if (row === null || typeof row !== 'object' || typeof row.id !== 'string') continue;
          if (row.parentSessionId !== undefined && row.parentSessionId !== null) continue;
          // A blank Session is a provisional "new conversation" that never started
          // a turn. It is not a conversation the user can return to, so keep it out
          // of every list instead of leaving empty entries in recents/projects.
          if (row.blank === true) continue;
          if (archivedIds.has(row.id)) retired.push(rowOf(row, true));
          else active.push(rowOf(row, false));
        }
        const compare = (a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          if (a.rank !== b.rank) return a.rank - b.rank;
          return b.updatedAt - a.updatedAt;
        };
        active.sort(compare);
        retired.sort((a, b) => b.updatedAt - a.updatedAt);
        const pinned = active.filter((row) => row.pinned === true).slice().sort((a, b) => b.updatedAt - a.updatedAt);
        const recent = active.filter((row) => row.pinned !== true);
        return { pinnedRows: pinned, recentRows: recent, activeRows: active, archivedRows: retired };
      }, [sessions, archivedIds, rowOf]);

      const sessionsByWorkspace = useMemo(() => {
        const map = new Map();
        for (const row of activeRows) {
          const owner = workspaceItems.find((item) => Array.isArray(item.sessionIds) && item.sessionIds.includes(row.id));
          if (owner === undefined || typeof owner.workspaceId !== 'string') continue;
          const bucket = map.get(owner.workspaceId);
          if (bucket === undefined) map.set(owner.workspaceId, [row]);
          else bucket.push(row);
        }
        return map;
      }, [activeRows, workspaceItems]);

      const labelForDay = useCallback(
        (day) => {
          const today = startOfDay(Date.now());
          if (day === today) return t('date.today');
          if (day === today - 86400000) return t('date.yesterday');
          const date = new Date(day);
          if (today - day < 7 * 86400000) return t('date.weekday.' + String(date.getDay()));
          const month = date.getMonth() + 1;
          return localeIsZh()
            ? date.getFullYear() + '年' + month + '月' + date.getDate() + '日'
            : date.getFullYear() + '-' + pad2(month) + '-' + pad2(date.getDate());
        },
        [t],
      );

      const metaOf = useCallback(
        (ms) => {
          const value = typeof ms === 'number' && ms > 0 ? ms : Date.now();
          if (value >= startOfDay(Date.now())) {
            const date = new Date(value);
            return pad2(date.getHours()) + ':' + pad2(date.getMinutes());
          }
          return labelForDay(startOfDay(value));
        },
        [labelForDay],
      );

      const onAddWorkspace = useCallback(async () => {
        try {
          setAddError('');
          await addWorkspace();
        } catch (error) {
          console.warn('[projects-browser] adding a workspace failed:', error);
          setAddError(t('error.addWorkspace'));
        }
      }, [addWorkspace, t]);

      const onArchive = useCallback(
        async (row) => {
          try {
            setActionError('');
            await archiveSession(row.id, undefined);
          } catch (reason) {
            const rpcError =
              reason instanceof Error && reason.name === 'WorkspaceArchiveError' ? reason.rpcError : undefined;
            if (rpcError === undefined || rpcError.code !== 'workspace/session-active') {
              console.warn('[projects-browser] archiving the session failed:', reason);
              setActionError(t('error.archive'));
              return;
            }
            if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
              const proceed = window.confirm(t('archive.confirm').replace('{title}', row.title));
              if (!proceed) return;
            }
            try {
              await archiveSession(row.id, { stopActivity: true });
            } catch (error) {
              console.warn('[projects-browser] stopping and archiving the session failed:', error);
              setActionError(t('error.archive'));
            }
          }
        },
        [archiveSession, t],
      );

      const onTogglePin = useCallback(
        async (row) => {
          try {
            setActionError('');
            if (row.pinned) await unpinSession(row.id);
            else await pinSession(row.id);
          } catch (reason) {
            console.warn('[projects-browser] pinning the session failed:', reason);
            setActionError(t('error.pin'));
          }
        },
        [pinSession, unpinSession, t],
      );

      const onUnarchive = useCallback(
        async (row) => {
          try {
            setActionError('');
            await unarchiveSession(row.id);
          } catch (reason) {
            console.warn('[projects-browser] restoring the session failed:', reason);
            setActionError(t('error.archive'));
          }
        },
        [unarchiveSession, t],
      );

      const isRunning = useCallback(
        (sessionId) => {
          if (statuses === undefined || statuses === null || typeof statuses.get !== 'function') return false;
          const status = statuses.get(sessionId);
          return status !== undefined && status !== null && status.running === true;
        },
        [statuses],
      );

      // A session that runs again is no longer an unexpected stop.
      useEffect(() => {
        if (errorStore === undefined || errorStore === null || errorSet.size === 0) return;
        if (statuses === undefined || statuses === null || typeof statuses.get !== 'function') return;
        for (const id of errorSet) {
          const status = statuses.get(id);
          if (status !== undefined && status !== null && status.running === true && typeof errorStore.clear === 'function') {
            errorStore.clear(id);
          }
        }
      }, [statuses, errorSet, errorStore]);

      // Remember every turn this page sees running, and forget it when the same
      // page sees it finish. A marker the process never got to clear means the
      // Harness died while that turn was running, which the Host reports as an
      // unexpected stop once the Session resumes.
      useEffect(() => {
        if (statuses === undefined || statuses === null || typeof statuses.forEach !== 'function') return;
        const markers = readInterruptedTurns();
        const seen = runningSeen.current;
        const cleared = [];
        let changed = false;
        const cutoff = Date.now() - 30 * 86400000;
        for (const id of Object.keys(markers)) {
          const entry = markers[id];
          if (entry === null || typeof entry !== 'object' || typeof entry.at !== 'number' || entry.at < cutoff) {
            delete markers[id];
            changed = true;
          }
        }
        statuses.forEach((status, sessionId) => {
          if (typeof sessionId !== 'string' || sessionId === '') return;
          const running = status !== undefined && status !== null && status.running === true;
          if (running) {
            seen.add(sessionId);
            if (markers[sessionId] === undefined) {
              markers[sessionId] = { at: Date.now() };
              changed = true;
            }
          } else if (seen.has(sessionId)) {
            seen.delete(sessionId);
            cleared.push(sessionId);
            if (markers[sessionId] !== undefined) {
              delete markers[sessionId];
              changed = true;
            }
          }
        });
        if (changed) writeInterruptedTurns(markers);
        if (cleared.length > 0) {
          setInterruptedIds((current) => {
            const next = new Set(current);
            let mutated = false;
            for (const id of cleared) if (next.delete(id)) mutated = true;
            return mutated ? next : current;
          });
        }
      }, [statuses]);

      const clearInterrupted = useCallback((sessionId) => {
        const markers = readInterruptedTurns();
        if (markers[sessionId] !== undefined) {
          delete markers[sessionId];
          writeInterruptedTurns(markers);
        }
        setInterruptedIds((current) => {
          if (!current.has(sessionId)) return current;
          const next = new Set(current);
          next.delete(sessionId);
          return next;
        });
      }, []);

      if (!wide) {
        return h(
          'div',
          { className: 'dsh-pb-rail' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-pb-action',
              title: t('collapsed.expand'),
              'aria-label': t('collapsed.expand'),
              onClick: () => expandSidebar(),
            },
            FOLDER_ICON,
          ),
        );
      }

      const markOf = (row) => {
        if (row.mark === 'running') return h(RunningMark, { label: t('status.running') });
        if (row.mark === 'approval') {
          return h('span', { className: 'dsh-pb-dot', 'data-tone': 'approval', title: t('status.approval'), 'aria-label': t('status.approval') });
        }
        if (row.mark === 'error') {
          return h('span', { className: 'dsh-pb-dot', 'data-tone': 'error', title: t('status.error'), 'aria-label': t('status.error') });
        }
        if (row.mark === 'completed') {
          return h('span', { className: 'dsh-pb-dot', 'data-tone': 'completed', title: t('status.completed'), 'aria-label': t('status.completed') });
        }
        return null;
      };

      const sessionRow = (row) =>
        h(SessionMenu, {
          key: row.id,
          row,
          pinnedLabel: t('menu.unpin'),
          meta: metaOf(row.updatedAt),
          mark: markOf(row),
          items: [
            {
              label: row.pinned ? t('menu.unpin') : t('menu.pin'),
              icon: PIN_ICON,
              run: () => onTogglePin(row),
            },
            {
              label: t('menu.archive'),
              icon: ARCHIVE_ICON,
              run: () => onArchive(row),
            },
          ],
          onOpen: (sessionId) => {
            if (errorStore !== undefined && errorStore !== null) errorStore.clear(sessionId);
            clearInterrupted(sessionId);
            openSession(sessionId);
          },
          t,
        });

      const archivedRow = (row) =>
        h(SessionMenu, {
          key: row.id,
          row,
          meta: metaOf(row.updatedAt),
          mark: null,
          items: [
            {
              label: t('menu.unarchive'),
              icon: RESTORE_ICON,
              run: () => onUnarchive(row),
            },
          ],
          onOpen: () => {},
          t,
        });

      const sectionHeader = (label, open, onToggle, action) =>
        h(
          'div',
          { className: 'dsh-pb-head' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-pb-head-main',
              'aria-expanded': open ? 'true' : 'false',
              title: open ? t('section.' + label + '.collapse') : t('section.' + label + '.expand'),
              onClick: onToggle,
            },
            h(Chevron, { open }),
            h('span', { className: 'dsh-pb-head-label' }, t('section.' + label)),
          ),
          action === undefined ? null : action,
        );

      const projectRow = (workspace) => {
        const open = expanded.includes(workspace.workspaceId);
        const children = sessionsByWorkspace.get(workspace.workspaceId) || [];
        const name =
          typeof workspace.title === 'string' && workspace.title !== ''
            ? workspace.title
            : isDefaultWorkspace(workspace.path)
              ? t('projects.defaultName')
              : basenameOf(workspace.path);
        return h(
          'div',
          { key: workspace.workspaceId, className: 'dsh-pb-section' },
          h(
            'div',
            { className: 'dsh-pb-project' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-pb-row',
                'aria-expanded': open ? 'true' : 'false',
                title: name + ' — ' + String(workspace.path === undefined ? '' : workspace.path),
                onClick: () => toggleProject(workspace.workspaceId),
              },
              h(Chevron, { open }),
              h('span', { className: 'dsh-pb-icon' }, FOLDER_ICON),
              h('span', { className: 'dsh-pb-title' }, name),
              h('span', { className: 'dsh-pb-meta' }, String(children.length)),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-pb-action',
                title: t('project.newSession'),
                'aria-label': t('project.newSession'),
                onClick: () => startSession(workspace.workspaceId),
              },
              PLUS_ICON,
            ),
          ),
          open
            ? children.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('project.empty'))
              : h('div', { className: 'dsh-pb-nested' }, children.map(sessionRow))
            : null,
        );
      };

      return h(
        'div',
        { className: 'dsh-pb-root' },
        pinnedRows.length === 0
          ? null
          : h(
              'div',
              { className: 'dsh-pb-section' },
              sectionHeader('pinned', pinnedOpen, togglePinnedOpen),
              pinnedOpen ? h('div', { className: 'dsh-pb-section' }, pinnedRows.map(sessionRow)) : null,
            ),
        h(
          'div',
          { className: 'dsh-pb-section' },
          sectionHeader(
            'projects',
            projectsOpen,
            toggleProjectsOpen,
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-pb-action',
                title: t('projects.add'),
                'aria-label': t('projects.add'),
                onClick: onAddWorkspace,
              },
              PLUS_ICON,
            ),
          ),
          addError === '' ? null : h('div', { className: 'dsh-pb-error' }, addError),
          projectsOpen
            ? workspaceItems.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('projects.add'))
              : workspaceItems.map(projectRow)
            : null,
        ),
        h(
          'div',
          { className: 'dsh-pb-section' },
          sectionHeader('recent', recentOpen, toggleRecentOpen),
          actionError === '' ? null : h('div', { className: 'dsh-pb-error' }, actionError),
          recentOpen
            ? recentRows.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('recent.empty'))
              : h('div', { className: 'dsh-pb-section' }, recentRows.map(sessionRow))
            : null,
        ),
        h(
          'div',
          { className: 'dsh-pb-section' },
          sectionHeader('archived', archivedOpen, toggleArchivedOpen),
          archivedOpen
            ? archivedRows.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('archived.empty'))
              : h('div', { className: 'dsh-pb-section' }, archivedRows.map(archivedRow))
            : null,
        ),
      );
    }

    return {
      inject: ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace', 'remote'],
      apply(ctx) {
        const uiWorkspace = ctx.get('uiWorkspace');
        const workspaces = ctx.get('workspaces');
        const errorStore = createErrorStore();
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'projects-browser: dictionaries');
        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.setAttribute('data-plugin-css', 'projects-browser');
          tag.textContent = CSS;
          document.head.appendChild(tag);
          return () => tag.remove();
        }, 'projects-browser: styles');
        ctx.effect(() => {
          let dispose;
          try {
            dispose = ctx.remote.$on('api-session/error', (sessionId) => {
              if (typeof sessionId !== 'string' || sessionId === '') return;
              errorStore.mark(sessionId);
            });
          } catch (error) {
            console.warn('[projects-browser] cannot subscribe to session failures:', error);
            return () => {};
          }
          return () => {
            if (typeof dispose === 'function') dispose();
          };
        }, 'projects-browser: failure stream');

        // Lower priority than the shipped browser: only the lowest-priority
        // single-slot registration is active, so this one replaces the view.
        ctx.slots.inject('sidebar.workspaces', () =>
          ctx.slots.register(
            {
              name: 'sidebar.workspaces',
              priority: -10,
              locale: NS,
              inject: () => ({
                openSession: (sessionId) => uiWorkspace.openSession(sessionId),
                startSession: (workspaceId) => uiWorkspace.startSession(workspaceId),
                archiveSession: (sessionId, options) => uiWorkspace.archiveSession(sessionId, options === undefined ? {} : options),
                unarchiveSession: (sessionId) => uiWorkspace.unarchiveSession(sessionId),
                pinSession: (sessionId) => uiWorkspace.pinSession(sessionId),
                unpinSession: (sessionId) => uiWorkspace.unpinSession(sessionId),
                errorStore,
                addWorkspace: async () => {
                  const path = await uiWorkspace.pickDirectory();
                  if (path === undefined || path === null || path === '') return;
                  await workspaces.create({ path });
                },
              }),
            },
            ProjectsBrowser,
          ),
        );
      },
    };
  },
});
