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
      'archived.title': '已归档会话',
      'archived.description': '归档的会话不在侧边栏显示，恢复后会回到「最近」。',
      'archived.restore': '恢复',
      'project.delete': '删除项目',
      'project.delete.confirm': '从侧边栏删除「{name}」？文件夹和会话记录都会保留。',
      'error.deleteWorkspace': '删除项目失败',
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
      'ctx.addWorkspace': '添加工作区',
      'ctx.rename': '重命名',
      'ctx.deleteWorkspace': '删除',
      'ctx.sort.activity': '按最近活跃时间',
      'ctx.sort.created': '按创建时间',
      'ctx.sort.name': '按名称',
      'ctx.collapse': '折叠',
      'ctx.expand': '展开',
      'ctx.showPinned': '显示置顶分区',
      'ctx.hidePinned': '隐藏置顶分区',
      'ctx.showArchived': '显示已归档会话',
      'ctx.hideArchived': '隐藏已归档会话',
      'ctx.showNative': '显示原生侧栏项（插件/定时任务等）',
      'ctx.hideNative': '隐藏原生侧栏项（插件/定时任务等）',
      'error.renameWorkspace': '重命名项目失败',
      'search.button': '搜索会话',
      'search.placeholder': '搜索会话标题或对话内容',
      'search.clear': '清空搜索',
      'search.close': '收起搜索',
      'search.results': '搜索结果',
      'search.count': '{n} 条结果',
      'search.pending': '正在搜索…',
      'search.empty': '没有匹配的会话',
      'search.error': '搜索失败，请稍后重试',
      'search.titleOnly': '仅匹配标题与项目名（内容检索未启用）',
      'search.hasMore': '只显示前 {n} 条结果，输入更精确的关键词可缩小范围',
      'search.archived': '已归档',
      'search.archivedBlocked': '「{title}」已归档，先在「已归档」分区恢复后再打开。',
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
      'archived.title': 'Archived sessions',
      'archived.description': 'Archived sessions are hidden from the sidebar. Restoring one puts it back into Recent.',
      'archived.restore': 'Restore',
      'project.delete': 'Delete project',
      'project.delete.confirm': 'Remove "{name}" from the sidebar? The folder and its session logs are kept.',
      'error.deleteWorkspace': 'Could not delete the project',
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
      'ctx.addWorkspace': 'Add workspace',
      'ctx.rename': 'Rename',
      'ctx.deleteWorkspace': 'Delete',
      'ctx.sort.activity': 'Sort by last active',
      'ctx.sort.created': 'Sort by created',
      'ctx.sort.name': 'Sort by name',
      'ctx.collapse': 'Collapse',
      'ctx.expand': 'Expand',
      'ctx.showPinned': 'Show pinned section',
      'ctx.hidePinned': 'Hide pinned section',
      'ctx.showArchived': 'Show archived sessions',
      'ctx.hideArchived': 'Hide archived sessions',
      'ctx.showNative': 'Show native sidebar entries (plugins, scheduled tasks, ...)',
      'ctx.hideNative': 'Hide native sidebar entries (plugins, scheduled tasks, ...)',
      'error.renameWorkspace': 'Could not rename the project',
      'search.button': 'Search sessions',
      'search.placeholder': 'Search titles or message content',
      'search.clear': 'Clear search',
      'search.close': 'Close search',
      'search.results': 'Search results',
      'search.count': '{n} results',
      'search.pending': 'Searching…',
      'search.empty': 'No matching sessions',
      'search.error': 'Search failed. Try again in a moment.',
      'search.titleOnly': 'Matching titles and projects only (content search is off)',
      'search.hasMore': 'Showing the first {n} results. Add more words to narrow the search.',
      'search.archived': 'Archived',
      'search.archivedBlocked': '"{title}" is archived. Restore it from the Archived section before opening it.',
    };

    const CSS = [
      '.dsh-pb-root{display:flex;flex-direction:column;gap:10px;min-height:0;overflow-y:auto;padding:2px 0 10px}',
      '.dsh-pb-root::-webkit-scrollbar{width:8px}',
      '.dsh-pb-section{display:flex;flex-direction:column;gap:1px;min-width:0}',
      '.dsh-pb-head{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:2px;height:30px;margin:0 -2px;padding:0 2px;background:var(--dsw-specific-sidebar-fill);border-bottom:1px solid var(--dsw-alias-border-l2)}',
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
      '.dsh-pb-archived{display:flex;flex-direction:column;gap:8px;padding:2px 0}',
      '.dsh-pb-archived-title{margin:0;color:var(--dsw-alias-label-primary);font-size:14px;font-weight:600;line-height:22px}',
      '.dsh-pb-archived-desc{margin:0 0 4px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}',
      // The shipped sidebar rows (Plugins / Scheduled tasks / Context insights /
      // More) are noise for this workflow: only Projects and Recent should stay.
      '.dsh-pb-hide-native [class*="wtg9ga_panelList"]{display:none!important}',
      '.dsh-pb-hide-native [class*="wtg9ga_moreAnchor"]{display:none!important}',
      '.dsh-pb-ctx{position:fixed;z-index:60;min-width:176px;padding:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-shadow-lv3)}',
      '.dsh-pb-ctx-item{display:flex;align-items:center;gap:8px;width:100%;height:28px;padding:0 8px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;text-align:left;cursor:pointer;white-space:nowrap}',
      '.dsh-pb-ctx-item:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-pb-ctx-icon{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-ctx-label{flex:1}',
      '.dsh-pb-ctx-check{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;color:var(--dsw-alias-state-business-primary)}',
      '.dsh-pb-ctx-sep{height:1px;margin:4px 6px;background:var(--dsw-alias-border-l2)}',
      '.dsh-pb-rename{flex:1;min-width:0;height:24px;padding:0 6px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;outline:none}',
      '.dsh-pb-rename:focus{border-color:var(--dsw-alias-state-business-primary)}',
      // Session search lives behind a magnifier button that sits next to the
      // notification bell; the field itself is an ordinary row at the top of
      // the list (no sticky), so it never fights the section headers.
      '.dsh-pb-search{display:flex;align-items:center;gap:6px;box-sizing:border-box;height:30px;margin:0 -2px 2px;padding:0 6px;border:1px solid transparent;border-radius:6px;background:var(--dsw-alias-bg-layer-1)}',
      '.dsh-pb-search:focus-within{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1)}',
      '.dsh-pb-search-icon{display:inline-flex;flex:none;justify-content:center;align-items:center;width:16px;height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-search:focus-within .dsh-pb-search-icon{color:var(--dsw-alias-state-business-primary)}',
      '.dsh-pb-search-input{flex:1;min-width:0;height:24px;padding:0;border:none;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:18px;outline:none}',
      '.dsh-pb-search-input::placeholder{color:var(--dsw-alias-label-tertiary)}',
      '.dsh-pb-search-clear{display:inline-flex;flex:none;justify-content:center;align-items:center;width:18px;height:18px;padding:0;border:none;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}',
      '.dsh-pb-search-clear:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-search-launcher{position:fixed;z-index:1000;pointer-events:auto;box-sizing:border-box;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s ease,color .15s ease}',
      '.dsh-pb-search-launcher:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-search-launcher[data-open="true"]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsh-pb-search-launcher svg{width:17px;height:17px;display:block}',
      '.dsh-pb-search-count{flex:none;padding-right:2px;color:var(--dsw-alias-label-tertiary);font-size:11px}',
      '.dsh-pb-result{display:flex;flex-direction:column;gap:1px;box-sizing:border-box;width:100%;min-height:44px;padding:4px 6px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer}',
      '.dsh-pb-result:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-pb-result:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}',
      '.dsh-pb-result[data-archived="true"]{cursor:default}',
      '.dsh-pb-result-head{display:flex;align-items:center;gap:8px;min-width:0;min-height:20px}',
      '.dsh-pb-result-title{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:13px;line-height:18px}',
      '.dsh-pb-result-sub{display:flex;align-items:center;gap:6px;min-width:0;padding-left:24px}',
      '.dsh-pb-result-workspace{flex:none;max-width:44%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}',
      '.dsh-pb-result-snippet{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px}',
      '.dsh-pb-hit{padding:0;border-radius:2px;background:var(--dsw-alias-state-warn-fill, rgba(255, 193, 7, .3));color:inherit;font-weight:600}',
      '.dsh-pb-tag{flex:none;padding:0 4px;border-radius:4px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:15px}',
      '.dsh-pb-search-more{padding:2px 8px 2px 24px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}',
      '.dsh-pb-search-empty{padding:2px 8px 6px 24px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}',
      '.dsh-pb-search-hint{padding:0 8px 4px 24px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;font-style:italic}',
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

    const TRASH_ICON = h(
      'svg',
      { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', {
        d: 'M4 7h16M9 7V4.5h6V7m-8 0 1 13h8l1-13',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
    );

    const CHECK_ICON = h(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', { d: 'M5 12.5 9.5 17 19 7', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    );

    const SEARCH_ICON = h(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('circle', { cx: 10.5, cy: 10.5, r: 6.5, stroke: 'currentColor', strokeWidth: 1.6 }),
      h('path', { d: 'M15.5 15.5 21 21', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
    );

    const CLEAR_ICON = h(
      'svg',
      { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
      h('path', { d: 'M6 6l12 12M18 6 6 18', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' }),
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

    /** A compact timestamp for the settings list: today keeps the time, older shows the date. */
    function formatWhen(ms) {
      if (typeof ms !== 'number' || ms <= 0) return '';
      const date = new Date(ms);
      const now = new Date();
      const sameDay =
        date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
      if (sameDay) return pad2(date.getHours()) + ':' + pad2(date.getMinutes());
      return localeIsZh()
        ? date.getMonth() + 1 + '月' + date.getDate() + '日'
        : date.getMonth() + 1 + '/' + date.getDate();
    }

    /** The host rejects oversized or NUL-bearing phrases, so clamp before asking. */
    const SEARCH_QUERY_MAX_CODE_UNITS = 500;
    const SEARCH_DEBOUNCE_MS = 250;
    const SEARCH_TIMEOUT_MS = 4000;
    const SEARCH_RESULT_LIMIT_FALLBACK = 50;

    /**
     * Set once the host answers that its session-query index is closed. Later
     * keystrokes then skip the round trip and filter locally right away
     * instead of paying the timeout on every query.
     */
    let contentSearchDisabled = false;

    /**
     * Search visibility is shared by two slot entries: the magnifier button
     * lives in `shell.overlay` next to the notification bell, while the field
     * itself is rendered inside the sidebar list. A tiny external store keeps
     * both in sync (and stays referentially stable for useSyncExternalStore).
     */
    function createSearchToggle() {
      let open = false;
      let focusPending = false;
      const listeners = new Set();
      const emit = () => {
        for (const listener of listeners) listener();
      };
      return {
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        isOpen() {
          return open;
        },
        setOpen(next) {
          if (open === next) return;
          open = next;
          focusPending = next;
          emit();
        },
        toggle() {
          if (open === false) {
            open = true;
            focusPending = true;
            emit();
            return;
          }
          open = false;
          focusPending = false;
          emit();
        },
        /** Consume the pending "focus the field" request; true only once. */
        takeFocus() {
          if (focusPending !== true) return false;
          focusPending = false;
          return true;
        },
      };
    }

    const searchToggle = createSearchToggle();

    function sanitizeSearchQuery(value) {
      const text = String(value === undefined || value === null ? '' : value).replace(/\0/g, '');
      if (text.length <= SEARCH_QUERY_MAX_CODE_UNITS) return text;
      let end = SEARCH_QUERY_MAX_CODE_UNITS;
      const last = text.charCodeAt(end - 1);
      const next = text.charCodeAt(end);
      if (last >= 0xd800 && last <= 0xdbff && next >= 0xdc00 && next <= 0xdfff) end -= 1;
      return text.slice(0, end);
    }

    function collapseWhitespace(value) {
      return String(value === undefined || value === null ? '' : value)
        .replace(/\s+/g, ' ')
        .trim();
    }

    /** Split a label into plain runs and query-matched runs, so hits can be marked. */
    function highlightParts(text, query) {
      const source = String(text === undefined || text === null ? '' : text);
      const needle = String(query === undefined || query === null ? '' : query).toLowerCase();
      if (needle === '') return [source];
      const haystack = source.toLowerCase();
      const parts = [];
      let from = 0;
      while (from < haystack.length) {
        const at = haystack.indexOf(needle, from);
        if (at < 0) break;
        if (at > from) parts.push(source.slice(from, at));
        parts.push({ highlight: source.slice(at, at + needle.length) });
        from = at + needle.length;
      }
      if (parts.length === 0) return [source];
      if (from < source.length) parts.push(source.slice(from));
      return parts;
    }

    function workspaceNameOf(workspace, t) {
      if (typeof workspace.title === 'string' && workspace.title !== '') return workspace.title;
      return isDefaultWorkspace(workspace.path) ? t('projects.defaultName') : basenameOf(workspace.path);
    }

    /**
     * DSH ships the session-query index closed (`session-query-sqlite` mounted
     * with `openAt: never`), so full-text calls answer with
     * SESSION_QUERY_SEARCH_DISABLED and the sidebar is meant to match titles
     * and workspace names only. That is a deployment choice, not a failure.
     */
    function isSearchDisabled(error) {
      if (error === null || error === undefined) return false;
      const code = typeof error.code === 'string' ? error.code : '';
      let message = '';
      try {
        message = typeof error.message === 'string' ? error.message : String(error);
      } catch {
        message = '';
      }
      return code === 'SESSION_QUERY_SEARCH_DISABLED' || message.includes('session search is disabled');
    }

    /**
     * Host-side full-text search over message content, debounced and aborted
     * with the query. The injected callback is kept in a ref: the slot builds
     * its props per render, and a changing function identity must not restart
     * an in-flight search.
     */
    function useSessionSearch(searchSessions, query) {
      const latest = useRef(searchSessions);
      latest.current = searchSessions;
      const [state, setState] = useState({ query: '', status: 'idle', items: [], hasMore: false });
      useEffect(() => {
        if (query === '') {
          setState((current) => (current.status === 'idle' ? current : { query: '', status: 'idle', items: [], hasMore: false }));
          return undefined;
        }
        const run = latest.current;
        if (typeof run !== 'function') {
          setState({ query, status: 'empty', items: [], hasMore: false });
          return undefined;
        }
        if (contentSearchDisabled) {
          setState({ query, status: 'title-only', items: [], hasMore: false });
          return undefined;
        }
        const controller = new AbortController();
        setState({ query, status: 'loading', items: [], hasMore: false });
        let settled = false;
        const settle = (next) => {
          if (settled || controller.signal.aborted) return;
          settled = true;
          window.clearTimeout(timeout);
          setState(next);
        };
        const timer = window.setTimeout(() => {
          Promise.resolve()
            .then(() => run(query, controller.signal))
            .then((result) => {
              const items = result !== null && typeof result === 'object' && Array.isArray(result.items) ? result.items : [];
              settle({ query, status: 'ready', items, hasMore: result !== null && typeof result === 'object' && result.hasMore === true });
            })
            .catch((error) => {
              if (controller.signal.aborted) return;
              if (isSearchDisabled(error)) {
                contentSearchDisabled = true;
                settle({ query, status: 'title-only', items: [], hasMore: false });
                return;
              }
              console.warn('[projects-browser] session search failed:', error);
              settle({ query, status: 'error', items: [], hasMore: false });
            });
        }, SEARCH_DEBOUNCE_MS);
        // A host that never answers must not leave the panel stuck on
        // "searching": fall back to title matching after the timeout.
        const timeout = window.setTimeout(() => {
          if (settled) return;
          settled = true;
          console.info('[projects-browser] session search timed out; matching titles only');
          setState({ query, status: 'title-only', items: [], hasMore: false });
        }, SEARCH_DEBOUNCE_MS + SEARCH_TIMEOUT_MS);
        return () => {
          window.clearTimeout(timer);
          window.clearTimeout(timeout);
          controller.abort();
        };
      }, [query]);
      return state;
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

    function readString(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null || raw === '' ? fallback : raw;
      } catch {
        return fallback;
      }
    }

    /** Persisted string preference (sort order, etc.). */
    function useStoredString(key, fallback) {
      const [value, setValue] = useState(() => readString(key, fallback));
      const set = useCallback(
        (next) => {
          setValue(next);
          try {
            localStorage.setItem(key, next);
          } catch {
            /* preference storage is best effort */
          }
        },
        [key],
      );
      return [value, set];
    }

    /**
     * Right-click menu for section headers and rows. It is anchored to the
     * pointer and rendered at this slot's root, which itself scrolls, so the
     * position is fixed rather than absolute.
     */
    function useContextMenu() {
      const [menu, setMenu] = useState(null);
      const close = useCallback(() => setMenu(null), []);
      const openAt = useCallback((event, items) => {
        event.preventDefault();
        event.stopPropagation();
        setMenu({ x: event.clientX, y: event.clientY, items });
      }, []);
      useEffect(() => {
        if (menu === null) return undefined;
        const onDown = (event) => {
          const target = event.target;
          if (target instanceof Node && typeof target.closest === 'function' && target.closest('.dsh-pb-ctx') !== null) return;
          close();
        };
        const onKey = (event) => {
          if (event.key === 'Escape') close();
        };
        const onScroll = () => close();
        document.addEventListener('mousedown', onDown, true);
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('scroll', onScroll, true);
        return () => {
          document.removeEventListener('mousedown', onDown, true);
          document.removeEventListener('keydown', onKey, true);
          window.removeEventListener('scroll', onScroll, true);
        };
      }, [menu, close]);
      const element =
        menu === null
          ? null
          : h(
              'div',
              { className: 'dsh-pb-ctx', role: 'menu', style: { left: menu.x + 'px', top: menu.y + 'px' } },
              menu.items.map((item, index) =>
                item.separator === true
                  ? h('div', { key: 'sep-' + String(index), className: 'dsh-pb-ctx-sep' })
                  : h(
                      'button',
                      {
                        key: String(item.label) + '-' + String(index),
                        type: 'button',
                        role: 'menuitem',
                        className: 'dsh-pb-ctx-item',
                        onClick: () => {
                          close();
                          item.run();
                        },
                      },
                      h('span', { className: 'dsh-pb-ctx-icon' }, item.icon === undefined ? null : item.icon),
                      h('span', { className: 'dsh-pb-ctx-label' }, item.label),
                      item.checked === true ? h('span', { className: 'dsh-pb-ctx-check' }, CHECK_ICON) : null,
                    ),
              ),
            );
      return { openAt, close, element };
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

    /** One project row: its actions menu (delete the registration only). */
    function ProjectMenu(props) {
      const { t, onDelete } = props;
      const ref = useRef(null);
      const [open, setOpen] = useState(false);
      const close = useCallback(() => setOpen(false), []);
      useDismiss(ref, open, close);
      return h(
        'div',
        { className: 'dsh-pb-item', style: { flex: 'none' }, ref },
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
              h(
                'button',
                {
                  type: 'button',
                  role: 'menuitem',
                  className: 'dsh-pb-menu-item',
                  onClick: () => {
                    close();
                    onDelete();
                  },
                },
                h('span', { className: 'dsh-pb-menu-icon' }, TRASH_ICON),
                t('project.delete'),
              ),
            )
          : null,
      );
    }

    const SIDEBAR_SELECTORS = [
      '[class*="wtg9ga_root"]',
      '[class*="_sideCol"]',
      '[class*="sidebarCol"]',
      '[class*="sidebar_col"]',
    ];

    /** The host's sidebar element; the magnifier anchors to its box. */
    function locateSidebar() {
      const frame = document.querySelector('[data-sidebar-collapsed]');
      if (frame !== null) {
        const child = frame.firstElementChild;
        if (child !== null && child.getBoundingClientRect().width > 24) return child;
      }
      for (const selector of SIDEBAR_SELECTORS) {
        const el = document.querySelector(selector);
        if (el !== null && el.getBoundingClientRect().width > 24) return el;
      }
      return null;
    }

    /** The notification bell rendered by the bell plugin, if it is installed. */
    function locateBell() {
      const el = document.querySelector('.dsh-nb-bell');
      if (el === null) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return null;
      return rect;
    }

    /**
     * Where the magnifier belongs: immediately left of the notification bell
     * when that plugin is present, otherwise in the same corner of the sidebar
     * box the bell itself would use. Re-measured on resize and layout shifts.
     */
    function useLauncherPlacement() {
      const [placement, setPlacement] = React.useState(null);
      React.useEffect(() => {
        let stopped = false;
        const measure = () => {
          if (stopped) return;
          const bell = locateBell();
          let next;
          if (bell !== null) {
            next = { left: Math.max(8, bell.left - 30), top: bell.top };
          } else {
            const el = locateSidebar();
            if (el === null) {
              setPlacement(null);
              return;
            }
            const rect = el.getBoundingClientRect();
            // The collapsed rail is ~48px wide and already carries its own
            // search action, so the floating magnifier only shows next to an
            // expanded sidebar.
            next = rect.width < 180 ? null : { left: Math.max(8, rect.right - 68), top: rect.top + 8 };
          }
          if (next === null) {
            setPlacement(null);
            return;
          }
          setPlacement((prev) => {
            if (prev !== null && Math.abs(prev.left - next.left) < 0.5 && Math.abs(prev.top - next.top) < 0.5) return prev;
            return next;
          });
        };
        measure();
        const timer = window.setInterval(measure, 400);
        let observer = null;
        if (typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(measure);
          const anchor = document.querySelector('.dsh-nb-bell') || locateSidebar();
          if (anchor !== null) observer.observe(anchor);
        }
        window.addEventListener('resize', measure);
        return () => {
          stopped = true;
          window.clearInterval(timer);
          window.removeEventListener('resize', measure);
          if (observer !== null) observer.disconnect();
        };
      }, []);
      return placement;
    }

    /**
     * The magnifier lives in `shell.overlay` next to the notification bell and
     * only toggles the search field that sits at the top of the sidebar list.
     */
    function SearchLauncher(props) {
      const t = props.t;
      const placement = useLauncherPlacement();
      const open = React.useSyncExternalStore(searchToggle.subscribe, searchToggle.isOpen);
      // The overlay slot does not always hand down a translator.
      const label = typeof t === 'function' ? t('search.button') : 'Search sessions';
      const style = {
        left: placement === null ? 8 : placement.left,
        top: placement === null ? 8 : placement.top,
        display: placement === null ? 'none' : 'flex',
      };
      return h(
        'button',
        {
          type: 'button',
          className: 'dsh-pb-search-launcher',
          'data-open': open === true ? 'true' : 'false',
          style,
          title: label,
          'aria-label': label,
          'aria-expanded': open === true ? 'true' : 'false',
          onClick: () => searchToggle.toggle(),
        },
        SEARCH_ICON,
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
        deleteWorkspace,
        renameWorkspace,
        errorStore,
        archiveSession,
        unarchiveSession,
        pinSession,
        unpinSession,
        searchSessions,
        searchResultLimit,
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
      const [pinnedHidden, togglePinnedHidden] = useFlag('dsh.projectsBrowser.pinnedHidden', false);
      const [showArchived, toggleShowArchived] = useFlag('dsh.projectsBrowser.archivedView', false);
      const [nativeHidden, toggleNativeHidden] = useFlag('dsh.projectsBrowser.nativeHidden', false);
      const [sortMode, setSortMode] = useStoredString('dsh.projectsBrowser.sort', 'activity');
      const ctx = useContextMenu();
      const [expanded, setExpanded] = useState(readExpanded);
      const [addError, setAddError] = useState('');
      const [actionError, setActionError] = useState('');
      const [interruptedIds, setInterruptedIds] = useState(() => new Set(Object.keys(readInterruptedTurns())));
      const runningSeen = useRef(new Set());
      const [query, setQuery] = useState('');
      const searchOpen = React.useSyncExternalStore(searchToggle.subscribe, searchToggle.isOpen);
      const searchInputRef = useRef(null);
      const normalizedQuery = collapseWhitespace(sanitizeSearchQuery(query));
      const searching = normalizedQuery !== '';
      const searchLimit =
        typeof searchResultLimit === 'number' && searchResultLimit > 0 ? searchResultLimit : SEARCH_RESULT_LIMIT_FALLBACK;
      const remoteSearch = useSessionSearch(searchSessions, normalizedQuery);

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

      // Session id -> the project label the row was filed under, so a search
      // result can say where it lives without a reverse lookup per row.
      const workspaceNames = useMemo(() => {
        const map = new Map();
        for (const workspace of workspaceItems) {
          if (workspace === null || typeof workspace !== 'object' || !Array.isArray(workspace.sessionIds)) continue;
          const name = workspaceNameOf(workspace, t);
          for (const id of workspace.sessionIds) if (!map.has(id)) map.set(id, name);
        }
        return map;
      }, [workspaceItems, t]);

      /**
       * Two sources, one list: title/workspace matches are derived locally from
       * the session snapshot (so a rename is visible immediately), and message
       * hits come from the Host content index. Title matches lead, then content
       * hits, each newest first inside its group.
       */
      const searchRows = useMemo(() => {
        if (normalizedQuery === '') return { items: [], hasMore: false };
        const byId =
          sessions !== undefined && sessions !== null && sessions.byId !== null && typeof sessions.byId === 'object' ? sessions.byId : {};
        const needle = normalizedQuery.toLowerCase();
        const contentById = new Map();
        if (remoteSearch.status === 'ready') {
          for (const item of remoteSearch.items) {
            if (item === null || typeof item !== 'object' || typeof item.sessionId !== 'string') continue;
            if (!contentById.has(item.sessionId)) contentById.set(item.sessionId, item);
          }
        }
        const titleHits = [];
        for (const row of Object.values(byId)) {
          if (row === null || typeof row !== 'object' || typeof row.id !== 'string') continue;
          if (row.parentSessionId !== undefined && row.parentSessionId !== null) continue;
          if (row.blank === true) continue;
          const title = (
            typeof row.displayTitle === 'string' && row.displayTitle !== ''
              ? row.displayTitle
              : typeof row.title === 'string'
                ? row.title
                : ''
          ).toLowerCase();
          const label = (workspaceNames.get(row.id) || '').toLowerCase();
          if (title.includes(needle) || label.includes(needle)) titleHits.push(row);
        }
        titleHits.sort(
          (a, b) => (typeof b.updatedAt === 'number' ? b.updatedAt : 0) - (typeof a.updatedAt === 'number' ? a.updatedAt : 0),
        );
        const ordered = [];
        const seen = new Set();
        const push = (row) => {
          if (row === undefined || row === null || typeof row.id !== 'string' || seen.has(row.id)) return;
          seen.add(row.id);
          ordered.push(row);
        };
        for (const row of titleHits) push(row);
        for (const sessionId of contentById.keys()) push(byId[sessionId]);
        const items = ordered.slice(0, searchLimit).map((row) => {
          const base = rowOf(row, archivedIds.has(row.id));
          const match = contentById.get(row.id);
          const snippet = match === undefined ? '' : collapseWhitespace(typeof match.snippet === 'string' ? match.snippet : '');
          return { ...base, workspace: workspaceNames.get(row.id) || basenameOf(row.cwd), snippet };
        });
        return { items, hasMore: remoteSearch.hasMore === true || ordered.length > searchLimit };
      }, [normalizedQuery, sessions, remoteSearch, workspaceNames, archivedIds, rowOf, searchLimit]);

      const orderIndex = useMemo(() => {
        const map = new Map();
        const ids = sessions !== undefined && sessions !== null && Array.isArray(sessions.ids) ? sessions.ids : [];
        ids.forEach((id, position) => {
          map.set(id, position);
        });
        return map;
      }, [sessions]);

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
        const bySort = (a, b) => {
          if (sortMode === 'name') return a.title.localeCompare(b.title, localeIsZh() ? 'zh-CN' : 'en');
          if (sortMode === 'created') {
            const left = orderIndex.has(a.id) ? orderIndex.get(a.id) : 0;
            const right = orderIndex.has(b.id) ? orderIndex.get(b.id) : 0;
            return right - left;
          }
          if (a.rank !== b.rank) return a.rank - b.rank;
          return b.updatedAt - a.updatedAt;
        };
        const compare = (a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return bySort(a, b);
        };
        active.sort(compare);
        retired.sort(bySort);
        const pinned = active.filter((row) => row.pinned === true).slice().sort(bySort);
        const recent = active.filter((row) => row.pinned !== true);
        return { pinnedRows: pinned, recentRows: recent, activeRows: active, archivedRows: retired };
      }, [sessions, archivedIds, rowOf, sortMode, orderIndex]);

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

      const onDeleteWorkspace = useCallback(
        async (workspace, name) => {
          if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
            const proceed = window.confirm(t('project.delete.confirm').replace('{name}', name));
            if (!proceed) return;
          }
          try {
            setActionError('');
            await deleteWorkspace(workspace.workspaceId);
          } catch (reason) {
            console.warn('[projects-browser] deleting the workspace failed:', reason);
            setActionError(t('error.deleteWorkspace'));
          }
        },
        [deleteWorkspace, t],
      );

      const isRunning = useCallback(
        (sessionId) => {
          if (statuses === undefined || statuses === null || typeof statuses.get !== 'function') return false;
          const status = statuses.get(sessionId);
          return status !== undefined && status !== null && status.running === true;
        },
        [statuses],
      );

      // The native sidebar entries (Plugins / Scheduled tasks / Context insight /
      // More) are hidden only while the user asks for it from the Projects menu.
      useEffect(() => {
        const root = document.documentElement;
        if (nativeHidden === true) root.classList.add('dsh-pb-hide-native');
        else root.classList.remove('dsh-pb-hide-native');
        return () => root.classList.remove('dsh-pb-hide-native');
      }, [nativeHidden]);

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

      const renameWorkspaceWithPrompt = useCallback(
        async (workspace, name) => {
          if (typeof window === 'undefined' || typeof window.prompt !== 'function') return;
          const answer = window.prompt(t('ctx.rename'), name);
          if (answer === null) return;
          const next = answer.trim();
          if (next === '' || next === name) return;
          try {
            setActionError('');
            await renameWorkspace(workspace.workspaceId, next);
          } catch (reason) {
            console.warn('[projects-browser] renaming the workspace failed:', reason);
            setActionError(t('error.renameWorkspace'));
          }
        },
        [renameWorkspace, t],
      );

      // Ctrl/Cmd+K is the native session-search shortcut; it belonged to the
      // component this plugin replaced, so claim it here: open the field (a
      // collapsed rail expands first) and let the focus effect take over.
      useEffect(() => {
        const onKeyDown = (event) => {
          if (event.defaultPrevented === true) return;
          if (event.altKey === true || event.shiftKey === true) return;
          if (event.ctrlKey !== true && event.metaKey !== true) return;
          if (typeof event.key !== 'string' || event.key.toLowerCase() !== 'k') return;
          event.preventDefault();
          event.stopPropagation();
          if (!wide) expandSidebar();
          searchToggle.setOpen(true);
          // Already-open field: the store does not change, so focus it here.
          const node = searchInputRef.current;
          if (node !== null && typeof node.focus === 'function') {
            node.focus();
            if (typeof node.select === 'function') node.select();
          }
        };
        window.addEventListener('keydown', onKeyDown, true);
        return () => window.removeEventListener('keydown', onKeyDown, true);
      }, [wide, expandSidebar]);

      useEffect(() => {
        if (!wide || !searchOpen) return;
        if (!searchToggle.takeFocus()) return;
        const node = searchInputRef.current;
        if (node !== null && typeof node.focus === 'function') {
          node.focus();
          if (typeof node.select === 'function') node.select();
        }
      }, [wide, searchOpen]);

      // Closing the field drops the phrase, so reopening starts clean.
      useEffect(() => {
        if (searchOpen) return;
        setQuery('');
      }, [searchOpen]);

      if (!wide) {
        return h(
          'div',
          { className: 'dsh-pb-rail' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-pb-action',
              title: t('search.button'),
              'aria-label': t('search.button'),
              onClick: () => {
                expandSidebar();
                searchToggle.setOpen(true);
              },
            },
            SEARCH_ICON,
          ),
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

      const sortItems = () => [
        { label: t('ctx.sort.activity'), checked: sortMode === 'activity', run: () => setSortMode('activity') },
        { label: t('ctx.sort.created'), checked: sortMode === 'created', run: () => setSortMode('created') },
        { label: t('ctx.sort.name'), checked: sortMode === 'name', run: () => setSortMode('name') },
      ];

      const openProjectsMenu = (event) =>
        ctx.openAt(event, [
          { label: t('ctx.addWorkspace'), icon: PLUS_ICON, run: onAddWorkspace },
          { separator: true },
          ...sortItems(),
          { separator: true },
          { label: projectsOpen ? t('ctx.collapse') : t('ctx.expand'), run: toggleProjectsOpen },
          { separator: true },
          { label: nativeHidden ? t('ctx.showNative') : t('ctx.hideNative'), run: toggleNativeHidden },
        ]);

      const openRecentMenu = (event) =>
        ctx.openAt(event, [
          ...sortItems(),
          { separator: true },
          { label: showArchived ? t('ctx.hideArchived') : t('ctx.showArchived'), run: toggleShowArchived },
        ]);

      const openPinnedMenu = (event) =>
        ctx.openAt(event, [
          ...sortItems(),
          { separator: true },
          { label: pinnedHidden ? t('ctx.showPinned') : t('ctx.hidePinned'), run: togglePinnedHidden },
        ]);

      const openProjectMenu = (event, workspace, name) =>
        ctx.openAt(event, [
          {
            label: t('ctx.rename'),
            icon: FOLDER_ICON,
            run: () => {
              void renameWorkspaceWithPrompt(workspace, name);
            },
          },
          { label: t('ctx.deleteWorkspace'), icon: TRASH_ICON, run: () => onDeleteWorkspace(workspace, name) },
        ]);

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

      const sectionHeader = (label, open, onToggle, action, onContext) =>
        h(
          'div',
          { className: 'dsh-pb-head', onContextMenu: onContext === undefined ? undefined : onContext },
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
            { className: 'dsh-pb-project', onContextMenu: (event) => openProjectMenu(event, workspace, name) },
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
            h(ProjectMenu, { t, onDelete: () => onDeleteWorkspace(workspace, name) }),
          ),
          open
            ? children.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('project.empty'))
              : h('div', { className: 'dsh-pb-nested' }, children.map(sessionRow))
            : null,
        );
      };

      const archivedSessionRow = (row) =>
        h(
          'div',
          { key: row.id, className: 'dsh-pb-item' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-pb-row',
              'data-session-id': row.id,
              title: row.title,
              onClick: () => openSession(row.id),
            },
            h('span', { className: 'dsh-pb-icon' }, CHAT_ICON),
            h('span', { className: 'dsh-pb-title' }, row.title),
            h('span', { className: 'dsh-pb-meta' }, metaOf(row.updatedAt)),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-pb-action',
              title: t('archived.restore'),
              'aria-label': t('archived.restore'),
              onClick: () => onUnarchive(row),
            },
            RESTORE_ICON,
          ),
        );

      const highlight = (text) =>
        highlightParts(text, normalizedQuery).map((part, index) =>
          typeof part === 'string' ? part : h('mark', { key: 'hit-' + String(index), className: 'dsh-pb-hit' }, part.highlight),
        );

      const openSearchResult = (row) => {
        if (row.archived === true) {
          setActionError(t('search.archivedBlocked').replace('{title}', row.title));
          return;
        }
        setActionError('');
        if (errorStore !== undefined && errorStore !== null && typeof errorStore.clear === 'function') errorStore.clear(row.id);
        clearInterrupted(row.id);
        setQuery('');
        openSession(row.id);
      };

      const searchRow = (row) =>
        h(
          'button',
          {
            key: row.id,
            type: 'button',
            className: 'dsh-pb-result',
            'data-session-id': row.id,
            'data-archived': row.archived === true ? 'true' : 'false',
            title: row.title,
            onClick: () => openSearchResult(row),
          },
          h(
            'span',
            { className: 'dsh-pb-result-head' },
            h('span', { className: 'dsh-pb-icon' }, CHAT_ICON),
            h('span', { className: 'dsh-pb-result-title' }, highlight(row.title)),
            row.archived === true ? h('span', { className: 'dsh-pb-tag' }, t('search.archived')) : null,
            markOf(row),
            h('span', { className: 'dsh-pb-meta' }, metaOf(row.updatedAt)),
          ),
          h(
            'span',
            { className: 'dsh-pb-result-sub' },
            row.workspace === '' ? null : h('span', { className: 'dsh-pb-result-workspace' }, row.workspace),
            row.snippet === '' ? null : h('span', { className: 'dsh-pb-result-snippet' }, highlight(row.snippet)),
          ),
        );

      const onSearchKeyDown = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          // First Escape clears the phrase, a second one puts the field away.
          if (searching) {
            setQuery('');
            return;
          }
          searchToggle.setOpen(false);
          return;
        }
        if (event.key !== 'Enter') return;
        const first = searchRows.items.find((row) => row.archived !== true);
        if (first === undefined) return;
        event.preventDefault();
        openSearchResult(first);
      };

      const searchField = h(
        'div',
        { className: 'dsh-pb-search' },
        h('span', { className: 'dsh-pb-search-icon' }, SEARCH_ICON),
        h('input', {
          ref: searchInputRef,
          className: 'dsh-pb-search-input',
          type: 'text',
          value: query,
          placeholder: t('search.placeholder'),
          'aria-label': t('search.button'),
          spellCheck: false,
          autoComplete: 'off',
          onChange: (event) => setQuery(event.target.value),
          onKeyDown: onSearchKeyDown,
        }),
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-pb-search-clear',
            title: searching ? t('search.clear') : t('search.close'),
            'aria-label': searching ? t('search.clear') : t('search.close'),
            onClick: () => {
              if (searching) {
                setQuery('');
                const node = searchInputRef.current;
                if (node !== null && typeof node.focus === 'function') node.focus();
                return;
              }
              setQuery('');
              searchToggle.setOpen(false);
            },
          },
          CLEAR_ICON,
        ),
      );

      const searchSection = h(
        'div',
        { className: 'dsh-pb-section' },
        h(
          'div',
          { className: 'dsh-pb-head' },
          h('span', { className: 'dsh-pb-head-label' }, t('search.results')),
          h(
            'span',
            { className: 'dsh-pb-search-count' },
            remoteSearch.status === 'loading' ? t('search.pending') : t('search.count').replace('{n}', String(searchRows.items.length)),
          ),
        ),
        actionError === '' ? null : h('div', { className: 'dsh-pb-error' }, actionError),
        remoteSearch.status === 'error' ? h('div', { className: 'dsh-pb-error' }, t('search.error')) : null,
        remoteSearch.status === 'title-only' ? h('div', { className: 'dsh-pb-search-hint' }, t('search.titleOnly')) : null,
        searchRows.items.length === 0
          ? remoteSearch.status === 'loading'
            ? null
            : h('div', { className: 'dsh-pb-search-empty' }, t('search.empty'))
          : h('div', { className: 'dsh-pb-section' }, searchRows.items.map(searchRow)),
        searchRows.hasMore ? h('div', { className: 'dsh-pb-search-more' }, t('search.hasMore').replace('{n}', String(searchLimit))) : null,
      );

      const browseSections = [
        pinnedRows.length === 0 || pinnedHidden === true
          ? null
          : h(
              'div',
              { className: 'dsh-pb-section' },
              sectionHeader('pinned', pinnedOpen, togglePinnedOpen, undefined, openPinnedMenu),
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
            openProjectsMenu,
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
          sectionHeader('recent', recentOpen, toggleRecentOpen, undefined, openRecentMenu),
          actionError === '' ? null : h('div', { className: 'dsh-pb-error' }, actionError),
          recentOpen
            ? recentRows.length === 0
              ? h('div', { className: 'dsh-pb-empty' }, t('recent.empty'))
              : h('div', { className: 'dsh-pb-section' }, recentRows.map(sessionRow))
            : null,
        ),
        showArchived === true
          ? h(
              'div',
              { className: 'dsh-pb-section' },
              sectionHeader('archived', showArchived, toggleShowArchived),
              archivedRows.length === 0
                ? h('div', { className: 'dsh-pb-empty' }, t('archived.empty'))
                : h('div', { className: 'dsh-pb-section' }, archivedRows.map(archivedSessionRow)),
            )
          : null,
      ];

      return h('div', { className: 'dsh-pb-root' }, searchOpen ? searchField : null, searching ? searchSection : browseSections, ctx.element);
    }

    /** Re-renders on a client store change; the store keeps its own snapshot. */
    function useStoreSnapshot(store) {
      const subscribe = useCallback((onChange) => store.subscribe(onChange), [store]);
      const getSnapshot = useCallback(() => store.getSnapshot(), [store]);
      return React.useSyncExternalStore(subscribe, getSnapshot);
    }

    /** Settings panel: every archived session, with a one-click restore. */
    function ArchivedSessionsSection(props) {
      const { t, unarchiveSession, openSession, close, sessionList, workspaceList } = props;
      const sessions = useStoreSnapshot(sessionList);
      const workspaces = useStoreSnapshot(workspaceList);
      const [error, setError] = useState('');
      const rows = useMemo(() => {
        const byId = sessions !== undefined && sessions !== null && sessions.byId !== null && typeof sessions.byId === 'object' ? sessions.byId : {};
        const ids = workspaces !== undefined && workspaces !== null && Array.isArray(workspaces.archivedSessionIds) ? workspaces.archivedSessionIds : [];
        const items = workspaces !== undefined && workspaces !== null && Array.isArray(workspaces.items) ? workspaces.items : [];
        const list = [];
        for (const id of ids) {
          const row = byId[id];
          if (row === undefined || row === null || typeof row !== 'object') continue;
          if (row.blank === true) continue;
          const owner = items.find(
            (item) => item !== null && typeof item === 'object' && Array.isArray(item.sessionIds) && item.sessionIds.includes(id),
          );
          const title =
            typeof row.displayTitle === 'string' && row.displayTitle !== ''
              ? row.displayTitle
              : typeof row.title === 'string' && row.title !== ''
                ? row.title
                : t('session.untitled');
          const workspace =
            owner === undefined
              ? ''
              : typeof owner.title === 'string' && owner.title !== ''
                ? owner.title
                : basenameOf(owner.path);
          list.push({ id, title, workspace, updatedAt: typeof row.updatedAt === 'number' ? row.updatedAt : 0 });
        }
        return list.sort((a, b) => b.updatedAt - a.updatedAt);
      }, [sessions, workspaces, t]);

      const restore = useCallback(
        async (sessionId) => {
          try {
            setError('');
            await unarchiveSession(sessionId);
          } catch (reason) {
            console.warn('[projects-browser] restoring the archived session failed:', reason);
            setError(t('error.archive'));
          }
        },
        [unarchiveSession, t],
      );

      return h(
        'div',
        { className: 'dsh-pb-archived' },
        h('h3', { className: 'dsh-pb-archived-title' }, t('archived.title')),
        h('p', { className: 'dsh-pb-archived-desc' }, t('archived.description')),
        error === '' ? null : h('div', { className: 'dsh-pb-error' }, error),
        rows.length === 0
          ? h('div', { className: 'dsh-pb-empty' }, t('archived.empty'))
          : h(
              'div',
              { className: 'dsh-pb-section' },
              rows.map((row) =>
                h(
                  'div',
                  { key: row.id, className: 'dsh-pb-item' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-pb-row',
                      title: row.title,
                      onClick: () => {
                        openSession(row.id);
                        if (typeof close === 'function') close();
                      },
                    },
                    h('span', { className: 'dsh-pb-icon' }, CHAT_ICON),
                    h('span', { className: 'dsh-pb-title' }, row.title),
                    row.workspace === '' ? null : h('span', { className: 'dsh-pb-meta' }, row.workspace),
                    h('span', { className: 'dsh-pb-meta' }, formatWhen(row.updatedAt)),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-pb-action',
                      title: t('archived.restore'),
                      'aria-label': t('archived.restore'),
                      onClick: () => restore(row.id),
                    },
                    RESTORE_ICON,
                  ),
                ),
              ),
            ),
      );
    }

    return {
      inject: ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace', 'remote'],
      apply(ctx) {
        const uiWorkspace = ctx.get('uiWorkspace');
        const workspaces = ctx.get('workspaces');
        const sessionsService = ctx.get('sessions');
        const errorStore = createErrorStore();
        const t = ctx.locale.bind(NS);
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
                deleteWorkspace: (workspaceId) => workspaces.delete(workspaceId),
                renameWorkspace: (workspaceId, title) => workspaces.rename(workspaceId, title),
                addWorkspace: async () => {
                  const path = await uiWorkspace.pickDirectory();
                  if (path === undefined || path === null || path === '') return;
                  await workspaces.create({ path });
                },
                // The Host owns a content index over visible messages; this
                // plugin only renders its result. A failed call throws so the
                // view can distinguish "no hits" from "search unavailable".
                searchSessions: async (query, signal) => {
                  if (sessionsService === undefined || sessionsService === null || typeof sessionsService.search !== 'function') {
                    return { items: [], hasMore: false };
                  }
                  const result = await sessionsService.search(query, signal);
                  if (result === null || typeof result !== 'object' || result.ok !== true) {
                    const message =
                      result !== null && typeof result === 'object' && result.error !== null && typeof result.error === 'object'
                        ? String(result.error.message)
                        : 'session search failed';
                    throw new Error(message);
                  }
                  return result.value;
                },
                searchResultLimit:
                  sessionsService !== undefined &&
                  sessionsService !== null &&
                  typeof sessionsService.searchResultLimit === 'number' &&
                  sessionsService.searchResultLimit > 0
                    ? sessionsService.searchResultLimit
                    : SEARCH_RESULT_LIMIT_FALLBACK,
              }),
            },
            ProjectsBrowser,
          ),
        );

        // The magnifier that opens the search field sits next to the
        // notification bell, both anchored to the sidebar box, so it belongs
        // to the overlay slot rather than to the sidebar list itself.
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'projects-browser-search',
              order: 101,
              locale: NS,
              inject: () => ({}),
            },
            SearchLauncher,
          ),
        );
      },
    };
  },
});

// build 2026-11-06T22:05 native-sidebar-toggle
// rev: search-magnifier-1
