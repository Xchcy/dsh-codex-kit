window.__ModuleLoader__.load({
	id: '@local/dsh-notifications-bell',
	factory(require) {
		const React = require('react');
		const h = React.createElement;

		const NS = 'notificationsBell';

		const zh = {
			'bell.label': '通知',
			'bell.tooltip': '通知',
			'bell.approvals': '{n} 个会话等待审批',
			'bell.errors': '{n} 个会话意外停止',
			'bell.completions': '{n} 个会话已完成',
			'panel.title': '通知',
			'panel.priority': '优先',
			'panel.running': '正在工作',
			'panel.approvals': '等待审批',
			'panel.errors': '意外停止',
			'panel.completions': '已完成',
			'panel.recent': '最近',
			'panel.emptyPriority': '暂无需要处理的会话',
			'panel.emptyRecent': '暂无最近会话',
			'panel.details': '查看详情',
			'board.title': '会话看板',
			'board.empty': '暂无会话',
			'board.all': '全部',
			'status.running': '运行中',
			'kind.approval': '等待审批',
			'kind.planReview': '等待确认计划',
			'kind.question': '等待回答',
			'kind.error': '意外停止',
			'group.today': '今天',
			'group.yesterday': '昨天',
			'group.earlier': '{y}年{m}月{d}日',
			'close': '关闭',
		};
		const en = {
			'bell.label': 'Notifications',
			'bell.tooltip': 'Notifications',
			'bell.approvals': '{n} sessions awaiting approval',
			'bell.errors': '{n} sessions stopped unexpectedly',
			'bell.completions': '{n} sessions completed',
			'panel.title': 'Notifications',
			'panel.priority': 'Priority',
			'panel.running': 'Working',
			'panel.approvals': 'Awaiting approval',
			'panel.errors': 'Stopped unexpectedly',
			'panel.completions': 'Completed',
			'panel.recent': 'Recent',
			'panel.emptyPriority': 'Nothing needs your attention',
			'panel.emptyRecent': 'No recent sessions',
			'panel.details': 'View details',
			'board.title': 'Session board',
			'board.empty': 'No sessions',
			'board.all': 'All',
			'status.running': 'Running',
			'kind.approval': 'Awaiting approval',
			'kind.planReview': 'Plan review',
			'kind.question': 'Awaiting answer',
			'kind.error': 'Stopped unexpectedly',
			'group.today': 'Today',
			'group.yesterday': 'Yesterday',
			'group.earlier': '{m}/{d}/{y}',
			'close': 'Close',
		};

		const CSS = [
			'.dsh-nb-bell{position:fixed;z-index:900;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s ease,color .15s ease}',
			'.dsh-nb-bell:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
			'.dsh-nb-bell[data-open="true"]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
			'.dsh-nb-bell svg{width:17px;height:17px;display:block}',
			'.dsh-nb-dot{position:absolute;width:7px;height:7px;border-radius:50%;border:1.5px solid var(--dsw-specific-sidebar-fill)}',
			'.dsh-nb-dot[data-tone="approval"]{top:1px;right:1px;background:var(--dsw-alias-state-warn-primary)}',
			'.dsh-nb-dot[data-tone="completed"]{top:1px;left:1px;background:var(--dsw-alias-state-business-primary)}',
			'.dsh-nb-dot[data-tone="error"]{bottom:1px;right:1px;background:var(--dsw-alias-state-error-primary)}',
			'.dsh-nb-panel{position:fixed;z-index:901;width:340px;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:var(--dsw-shadow-lv3);overflow:hidden;font-size:13px}',
			'.dsh-nb-head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--dsw-alias-separator-primary)}',
			'.dsh-nb-title{font-size:13px;font-weight:600}',
			'.dsh-nb-close{border:0;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;font-size:16px;line-height:1;padding:2px 4px;border-radius:6px}',
			'.dsh-nb-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
			'.dsh-nb-body{overflow:auto;padding:6px 0 8px}',
			'.dsh-nb-section-label{padding:8px 12px 4px;font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary)}',
			'.dsh-nb-empty{padding:8px 12px 10px;color:var(--dsw-alias-label-quaternary)}',
			'.dsh-nb-row{display:flex;flex-direction:column;gap:2px;width:100%;text-align:left;border:0;background:transparent;padding:7px 12px;cursor:pointer;color:inherit;font:inherit}',
			'.dsh-nb-row:hover{background:var(--dsw-alias-interactive-bg-hover)}',
			'.dsh-nb-rowmain{display:flex;align-items:center;gap:8px;min-width:0}',
			'.dsh-nb-rowdot{width:7px;height:7px;border-radius:50%;flex:none}',
			'.dsh-nb-rowdot[data-tone="approval"]{background:var(--dsw-alias-state-warn-primary)}',
			'.dsh-nb-rowdot[data-tone="completed"]{background:var(--dsw-alias-state-business-primary)}',
			'.dsh-nb-rowdot[data-tone="error"]{background:var(--dsw-alias-state-error-primary)}',
			'.dsh-nb-mark{position:relative;display:inline-block;flex:none;width:10px;height:10px}',
			'.dsh-nb-mark i{position:absolute;display:block;box-sizing:border-box;width:2px;height:2px;border-radius:50%;background:var(--dsw-alias-label-tertiary);opacity:.2;animation:dsh-nb-chase 1.8s linear infinite;animation-delay:calc(var(--dsh-nb-i, 0) * -0.225s)}',
			'@keyframes dsh-nb-chase{0%{opacity:1}6%{opacity:.92}14%{opacity:.72}26%{opacity:.48}40%{opacity:.3}56%{opacity:.17}78%{opacity:.17}90%{opacity:.44}100%{opacity:1}}',
			'@media (prefers-reduced-motion: reduce){.dsh-nb-mark i{animation:none;opacity:.5}}',
			'.dsh-nb-rowtitle{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.dsh-nb-rowtime{flex:none;font-size:11px;color:var(--dsw-alias-label-quaternary)}',
			'.dsh-nb-rowsub{font-size:11px;color:var(--dsw-alias-label-tertiary);padding-left:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.dsh-nb-sep{height:1px;margin:6px 12px;background:var(--dsw-alias-separator-primary)}',
			'.dsh-nb-summary{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:6px 12px;border:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;text-align:left;cursor:pointer}',
			'.dsh-nb-summary:hover{background:var(--dsw-alias-interactive-bg-hover)}',
			'.dsh-nb-summary-main{display:flex;align-items:center;gap:8px;min-width:0}',
			'.dsh-nb-summary-text{display:flex;flex-direction:column;min-width:0}',
			'.dsh-nb-summary-label{line-height:18px}',
			'.dsh-nb-summary-sub{font-size:11px;line-height:15px;color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.dsh-nb-summary-state{width:7px;height:7px;border-radius:50%;flex:none}',
			'.dsh-nb-summary-state[data-tone="approval"]{background:var(--dsw-alias-state-warn-primary)}',
			'.dsh-nb-summary-state[data-tone="completed"]{background:var(--dsw-alias-state-business-primary)}',
			'.dsh-nb-summary-state[data-tone="error"]{background:var(--dsw-alias-state-error-primary)}',
			'.dsh-nb-summary-count{flex:none;min-width:18px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600;text-align:center;line-height:18px}',
			'.dsh-nb-details{align-self:flex-end;margin:2px 12px 6px;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);border-radius:6px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer}',
			'.dsh-nb-details:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
			'.dsh-nb-all{align-self:center;margin-left:auto;margin-right:6px;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);border-radius:6px;padding:2px 8px;font:inherit;font-size:12px;cursor:pointer}',
			'.dsh-nb-all:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
			'.dsh-nb-head .dsh-nb-close{margin-left:0}',
			'.dsh-nb-board{position:fixed;z-index:902;width:360px;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:var(--dsw-shadow-lv3);overflow:hidden;font-size:13px}',
			'.dsh-nb-board-body{overflow:auto;padding:6px 0 8px}',
		].join('\n');

		function injectCss() {
			const existing = document.querySelector('style[data-dsh-notifications-bell]');
			if (existing !== null) return () => {};
			const style = document.createElement('style');
			style.setAttribute('data-dsh-notifications-bell', '');
			style.textContent = CSS;
			document.head.appendChild(style);
			return () => {
				style.remove();
			};
		}

		function pad2(n) {
			return n < 10 ? '0' + n : String(n);
		}

		function weekdayName(d, locale) {
			const namesZh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			const namesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			const names = locale === 'zh' ? namesZh : namesEn;
			return names[d.getDay()];
		}

		function dayKey(ts) {
			const d = new Date(ts);
			return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
		}

		function timeOfDay(ts) {
			const d = new Date(ts);
			return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
		}

		function clamp(v, min, max) {
			return Math.max(min, Math.min(max, v));
		}

		function pendingKindOf(status) {
			const pending = status === undefined || status === null ? undefined : status.pendingInteraction;
			if (pending === undefined || pending === null) return undefined;
			const kind = pending.kind;
			return kind === 'approval' || kind === 'plan-review' || kind === 'question' ? kind : undefined;
		}

		function localeName() {
			const lang = typeof navigator !== 'undefined' && typeof navigator.language === 'string' ? navigator.language.toLowerCase() : 'en';
			return lang.startsWith('zh') ? 'zh' : 'en';
		}

		/**
		 * Given the same session list, sort order is working, then approval,
		 * then unexpected stop, then completed, then everything else.
		 */
		function rankOf(status, hasError) {
			const running = status !== undefined && status !== null && status.running === true;
			if (running) return 0;
			if (pendingKindOf(status) !== undefined) return 1;
			if (hasError) return 2;
			if (status !== undefined && status !== null && status.completionUnread === true) return 3;
			return 4;
		}

		function markOfRank(rank) {
			if (rank === 0) return 'running';
			if (rank === 1) return 'approval';
			if (rank === 2) return 'error';
			if (rank === 3) return 'completed';
			return undefined;
		}

		/**
		 * Host-reported failures live outside the session list rows, so the bell
		 * keeps its own set. A session leaves the set once it runs again or is opened.
		 */
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

		const INTERRUPTED_TURNS_KEY = 'dsh.notificationsBell.interruptedTurns';

		/**
		 * A turn the Host never finished leaves no failure event behind: it only
		 * repairs that Session log when the Session resumes. Persist the ids of
		 * running Sessions so the next page load can flag a Session whose process
		 * was killed mid-turn.
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

		const SIDEBAR_SELECTORS = [
			'[class*="wtg9ga_root"]',
			'[class*="_sideCol"]',
			'[class*="sidebarCol"]',
			'[class*="sidebar_col"]',
		];

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

		function useSidebarRect() {
			const [rect, setRect] = React.useState(null);
			React.useEffect(() => {
				let stopped = false;
				const measure = () => {
					if (stopped) return;
					const el = locateSidebar();
					if (el === null) {
						setRect(null);
						return;
					}
					const r = el.getBoundingClientRect();
					setRect((prev) => {
						if (
							prev !== null &&
							Math.abs(prev.left - r.left) < 0.5 &&
							Math.abs(prev.top - r.top) < 0.5 &&
							Math.abs(prev.width - r.width) < 0.5 &&
							Math.abs(prev.height - r.height) < 0.5
						) {
							return prev;
						}
						return { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right };
					});
				};
				measure();
				const timer = window.setInterval(measure, 400);
				let observer = null;
				if (typeof ResizeObserver !== 'undefined') {
					observer = new ResizeObserver(measure);
					const el = locateSidebar();
					if (el !== null) observer.observe(el);
				}
				window.addEventListener('resize', measure);
				return () => {
					stopped = true;
					window.clearInterval(timer);
					window.removeEventListener('resize', measure);
					if (observer !== null) observer.disconnect();
				};
			}, []);
			return rect;
		}

		function BellIcon() {
			return h(
				'svg',
				{ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' },
				h('path', { d: 'M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8' }),
				h('path', { d: 'M13.7 20a2 2 0 0 1-3.4 0' }),
			);
		}

		/**
		 * The running mark: a square outline of eight dots. The dots stay in
		 * place and a bright trail travels around the perimeter: each dot fades
		 * from deep to light and then brightens again, so the deepest dot seems
		 * to walk along the square with a fading tail.
		 */
		function RunningMark() {
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
						style: { left: coords[index][0] + 'px', top: coords[index][1] + 'px', '--dsh-nb-i': String(index) },
					}),
				);
			}
			return h('span', { className: 'dsh-nb-mark', 'aria-hidden': 'true' }, dots);
		}

		function SessionRow(props) {
			const session = props.session;
			const mark = props.mark;
			return h(
				'button',
				{
					type: 'button',
					className: 'dsh-nb-row',
					onClick: () => props.onOpen(session.id),
					title: session.displayTitle,
					'data-session-id': session.id,
				},
				h(
					'div',
					{ className: 'dsh-nb-rowmain' },
					mark === 'running' ? h(RunningMark) : h('span', { className: 'dsh-nb-rowdot', 'data-tone': mark }),
					h('span', { className: 'dsh-nb-rowtitle' }, session.displayTitle),
					h('span', { className: 'dsh-nb-rowtime' }, props.meta === undefined ? timeOfDay(session.updatedAt ?? Date.now()) : props.meta),
				),
				props.subtitle === undefined ? null : h('div', { className: 'dsh-nb-rowsub' }, props.subtitle),
			);
		}

		function NotificationsOverlay(props) {
			const useSessions = props.useSessions;
			const useSessionStatus = props.useSessionStatus;
			const useWorkspaces = props.useWorkspaces;
			const errorStore = props.errorStore;
			const t = props.t;
			const openSession = props.openSession;

			const tr = (key, vars) => {
				let text = typeof t === 'function' ? t(key) : key;
				if (vars !== undefined) {
					for (const name of Object.keys(vars)) {
						text = text.split('{' + name + '}').join(String(vars[name]));
					}
				}
				return text;
			};

			const rect = useSidebarRect();
			const [open, setOpen] = React.useState(false);
			const [boardOpen, setBoardOpen] = React.useState(false);
			const [boardFocus, setBoardFocus] = React.useState(null);
			const rootRef = React.useRef(null);
			const bellRef = React.useRef(null);
			const boardRef = React.useRef(null);

			const list = typeof useSessions === 'function' ? useSessions((snapshot) => snapshot) : undefined;
			const statuses = typeof useSessionStatus === 'function' ? useSessionStatus((snapshot) => snapshot) : undefined;
			const workspaces = typeof useWorkspaces === 'function' ? useWorkspaces((snapshot) => snapshot) : undefined;
			const errors =
				errorStore === undefined || errorStore === null
					? undefined
					: React.useSyncExternalStore(errorStore.subscribe, errorStore.getSnapshot);

			const errorSet =
				errors === undefined || errors === null || errors.set === undefined || errors.set === null ? new Set() : errors.set;

			const [interruptedIds, setInterruptedIds] = React.useState(() => new Set(Object.keys(readInterruptedTurns())));
			const runningSeen = React.useRef(new Set());

			// Track running turns so the next load can mark the ones this process
			// never got to finish as an unexpected stop, exactly like an error.
			React.useEffect(() => {
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

			const clearInterrupted = React.useCallback((sessionId) => {
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

			const locale = localeName();
			const byId = list === undefined || list === null || list.byId === undefined ? {} : list.byId;
			const ids = list === undefined || list === null ? [] : Array.isArray(list.ids) ? list.ids : Object.keys(byId);
			const archivedSource = workspaces === undefined || workspaces === null ? [] : workspaces.archivedSessionIds;
			const archived = new Set(Array.isArray(archivedSource) ? archivedSource : []);

			const getStatus = (id) => {
				if (statuses === undefined || statuses === null) return undefined;
				if (typeof statuses.get === 'function') return statuses.get(id);
				return statuses[id];
			};

			const sessions = [];
			for (const id of ids) {
				const session = byId[id];
				if (session === undefined) continue;
				if (session.blank === true) continue;
				if (session.parentSessionId !== undefined) continue;
				if (archived.has(id)) continue;
				sessions.push(session);
			}

			const entries = [];
			for (const session of sessions) {
				const status = getStatus(session.id);
				const rank = rankOf(status, errorSet.has(session.id) || interruptedIds.has(session.id));
				entries.push({ session, status, rank, mark: markOfRank(rank) });
			}
			entries.sort((a, b) => {
				if (a.rank !== b.rank) return a.rank - b.rank;
				return (b.session.updatedAt ?? 0) - (a.session.updatedAt ?? 0);
			});

			const runningSessions = entries.filter((entry) => entry.rank === 0);
			const approvals = entries
				.filter((entry) => entry.rank === 1)
				.map((entry) => ({ session: entry.session, kind: pendingKindOf(entry.status) }));
			const stoppedSessions = entries.filter((entry) => entry.rank === 2);
			const completions = entries.filter((entry) => entry.rank === 3);

			React.useEffect(() => {
				if (errorSet.size === 0) return;
				for (const id of errorSet) {
					const status = getStatus(id);
					if (status !== undefined && status !== null && status.running === true) errorStore.clear(id);
				}
			}, [errors]);

			// Clicking the bell toggles the panel; clicking anywhere else (the
			// close button, Escape, or another part of the app) closes it too.
			React.useEffect(() => {
				if (!open) return undefined;
				const onDown = (event) => {
					const target = event.target;
					if (!(target instanceof Node)) {
						setOpen(false);
						return;
					}
					const root = rootRef.current;
					if (root !== null && root.contains(target)) return;
					const bell = bellRef.current;
					if (bell !== null && bell.contains(target)) return;
					const boardEl = boardRef.current;
					if (boardEl !== null && boardEl.contains(target)) return;
					setOpen(false);
				};
				const onKey = (event) => {
					if (event.key === 'Escape') setOpen(false);
				};
				document.addEventListener('mousedown', onDown, true);
				document.addEventListener('keydown', onKey, true);
				return () => {
					document.removeEventListener('mousedown', onDown, true);
					document.removeEventListener('keydown', onKey, true);
				};
			}, [open]);

			const hasApprovals = approvals.length > 0;
			const hasCompletions = completions.length > 0;
			const hasStopped = stoppedSessions.length > 0;
			const hasRunning = runningSessions.length > 0;

			const buttonStyle = {
				left: rect === null ? 8 : Math.max(8, rect.right - 38),
				top: rect === null ? 8 : rect.top + 8,
				display: rect === null || rect.width < 32 ? 'none' : 'flex',
			};

			const panelWidth = 340;
			const panelTop = rect === null ? 46 : rect.top + 44;
			const panelStyle = {
				left: rect === null ? 12 : clamp(rect.right + 8, 12, Math.max(12, window.innerWidth - panelWidth - 12)),
				top: panelTop,
				maxHeight: Math.max(200, window.innerHeight - panelTop - 16),
			};

			const bellParts = [];
			if (hasApprovals) bellParts.push(tr('bell.approvals', { n: approvals.length }));
			if (hasStopped) bellParts.push(tr('bell.errors', { n: stoppedSessions.length }));
			if (hasCompletions) bellParts.push(tr('bell.completions', { n: completions.length }));
			const bellLabel = bellParts.length === 0 ? tr('bell.tooltip') : bellParts.join(' · ');

			const onOpenSession = (id) => {
				setOpen(false);
				setBoardOpen(false);
				if (errorStore !== undefined && errorStore !== null) errorStore.clear(id);
				clearInterrupted(id);
				if (typeof openSession === 'function') openSession(id);
			};

			const statusEntries = {
				running: runningSessions,
				approvals,
				errors: stoppedSessions,
				completions,
			};
			// A status with a single session is an actionable notification: jump
			// straight to that conversation. Several sessions of the same status
			// cannot be represented by one click, so open the board focused there.
			const openStatus = (key) => {
				const rows = statusEntries[key] === undefined ? [] : statusEntries[key];
				if (rows.length === 1) {
					onOpenSession(rows[0].session.id);
					return;
				}
				setBoardFocus(key);
				setBoardOpen(true);
			};

			const renderPriorityRow = (entry) => {
				const subtitle =
					entry.kind === 'plan-review'
						? tr('kind.planReview')
						: entry.kind === 'question'
							? tr('kind.question')
							: tr('kind.approval');
				return h(SessionRow, {
					key: 'p:' + entry.session.id,
					session: entry.session,
					mark: 'approval',
					subtitle,
					onOpen: onOpenSession,
				});
			};

			const today = dayKey(Date.now());

			const metaLabel = (ts) => {
				const day = dayKey(ts);
				if (day === today) return timeOfDay(ts);
				if (day === today - 86400000) return tr('group.yesterday');
				if (today - day > 0 && today - day < 6 * 86400000) return weekdayName(new Date(day), locale);
				const date = new Date(day);
				return tr('group.earlier', { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate() });
			};

			const singleTitle = (rows) =>
				rows.length === 1
					? typeof rows[0].session.displayTitle === 'string' && rows[0].session.displayTitle !== ''
						? rows[0].session.displayTitle
						: typeof rows[0].session.title === 'string'
							? rows[0].session.title
							: ''
					: '';
			const priorityRows = [
				{ key: 'running', label: tr('panel.running'), count: runningSessions.length, tone: 'running', single: singleTitle(runningSessions) },
				{ key: 'approvals', label: tr('panel.approvals'), count: approvals.length, tone: 'approval', single: singleTitle(approvals) },
				{ key: 'errors', label: tr('panel.errors'), count: stoppedSessions.length, tone: 'error', single: singleTitle(stoppedSessions) },
				{ key: 'completions', label: tr('panel.completions'), count: completions.length, tone: 'completed', single: singleTitle(completions) },
			];
			const priorityTotal = priorityRows.reduce((sum, row) => sum + row.count, 0);

			const summaryState = (tone) =>
				tone === 'running'
					? h(RunningMark)
					: h('span', { className: 'dsh-nb-summary-state', 'data-tone': tone });

			const prioritySection = h(
				'div',
				null,
				h('div', { className: 'dsh-nb-section-label' }, tr('panel.priority')),
				priorityTotal === 0
					? h('div', { className: 'dsh-nb-empty' }, tr('panel.emptyPriority'))
					: priorityRows
							.filter((row) => row.count > 0)
							.map((row) =>
								h(
									'button',
									{
										type: 'button',
										key: 's:' + row.key,
										className: 'dsh-nb-summary',
										onClick: () => {
											openStatus(row.key);
										},
									},
									h(
										'span',
										{ className: 'dsh-nb-summary-main' },
										summaryState(row.tone),
										h(
											'span',
											{ className: 'dsh-nb-summary-text' },
											h('span', { className: 'dsh-nb-summary-label' }, row.label),
											row.single === ''
												? null
												: h('span', { className: 'dsh-nb-summary-sub' }, row.single),
										),
									),
									h('span', { className: 'dsh-nb-summary-count' }, String(row.count)),
								),
							),
				h(
					'button',
					{
						type: 'button',
						className: 'dsh-nb-details',
						onClick: () => {
							setBoardFocus(null);
							setBoardOpen(true);
						},
					},
					tr('panel.details'),
				),
			);

			const recentSection = h(
				'div',
				null,
				h('div', { className: 'dsh-nb-section-label' }, tr('panel.recent')),
				entries.length === 0 ? h('div', { className: 'dsh-nb-empty' }, tr('panel.emptyRecent')) : null,
				entries.map((entry) =>
					h(SessionRow, {
						key: 'r:' + entry.session.id,
						session: entry.session,
						mark: entry.mark,
						meta: metaLabel(entry.session.updatedAt ?? Date.now()),
						subtitle: undefined,
						onOpen: onOpenSession,
					}),
				),
			);

			const boardTop = rect === null ? 56 : Math.max(56, rect.top + 44);
			const boardStyle = { top: boardTop, right: 16, maxHeight: Math.max(200, window.innerHeight - boardTop - 16) };

			const boardGroup = (label, rows, mark) =>
				rows.length === 0
					? null
					: h(
							'div',
							null,
							h('div', { className: 'dsh-nb-section-label' }, label),
							rows.map((entry) =>
								h(SessionRow, {
									key: 'b:' + mark + ':' + entry.session.id,
									session: entry.session,
									mark,
									meta: metaLabel(entry.session.updatedAt ?? Date.now()),
									subtitle: undefined,
									onOpen: onOpenSession,
								}),
							),
						);

			const boardApprovals =
				approvals.length === 0
					? null
					: h(
							'div',
							null,
							h('div', { className: 'dsh-nb-section-label' }, tr('panel.approvals')),
							approvals.map((entry) =>
								h(SessionRow, {
									key: 'ba:' + entry.session.id,
									session: entry.session,
									mark: 'approval',
									meta: metaLabel(entry.session.updatedAt ?? Date.now()),
									subtitle:
										entry.kind === 'plan-review'
											? tr('kind.planReview')
											: entry.kind === 'question'
												? tr('kind.question')
												: tr('kind.approval'),
									onOpen: onOpenSession,
								}),
							),
						);

			const boardFocusLabel = (key) =>
				key === 'running'
					? tr('panel.running')
					: key === 'approvals'
						? tr('panel.approvals')
						: key === 'errors'
							? tr('panel.errors')
							: key === 'completions'
								? tr('panel.completions')
								: '';
			const showBoardGroup = (key) => boardFocus === null || boardFocus === key;
			const boardTitle =
				boardFocus === null ? tr('board.title') : tr('board.title') + ' · ' + boardFocusLabel(boardFocus);

			const board = boardOpen
				? h(
						'div',
						{ ref: boardRef, className: 'dsh-nb-board', style: boardStyle, role: 'dialog', 'aria-label': tr('board.title') },
						h(
							'div',
							{ className: 'dsh-nb-head' },
							h('span', { className: 'dsh-nb-title' }, boardTitle),
							boardFocus === null
								? null
								: h('button', { type: 'button', className: 'dsh-nb-all', onClick: () => setBoardFocus(null) }, tr('board.all')),
							h('button', { type: 'button', className: 'dsh-nb-close', title: tr('close'), onClick: () => setBoardOpen(false) }, '×'),
						),
						h(
							'div',
							{ className: 'dsh-nb-board-body' },
							entries.length === 0 ? h('div', { className: 'dsh-nb-empty' }, tr('board.empty')) : null,
							showBoardGroup('running') ? boardGroup(tr('panel.running'), runningSessions, 'running') : null,
							showBoardGroup('approvals') ? boardApprovals : null,
							showBoardGroup('errors') ? boardGroup(tr('panel.errors'), stoppedSessions, 'error') : null,
							showBoardGroup('completions') ? boardGroup(tr('panel.completions'), completions, 'completed') : null,
						),
					)
				: null;

			return h(
				React.Fragment,
				null,
				h(
					'button',
					{
						type: 'button',
						className: 'dsh-nb-bell',
						'data-open': open ? 'true' : 'false',
						style: buttonStyle,
						ref: bellRef,
						title: bellLabel,
						'aria-label': bellLabel,
						onClick: () => setOpen((value) => !value),
					},
					h(BellIcon),
					hasApprovals ? h('span', { className: 'dsh-nb-dot', 'data-tone': 'approval' }) : null,
					hasStopped ? h('span', { className: 'dsh-nb-dot', 'data-tone': 'error' }) : null,
					hasCompletions ? h('span', { className: 'dsh-nb-dot', 'data-tone': 'completed' }) : null,
				),
				open
					? h(
							'div',
							{ ref: rootRef, className: 'dsh-nb-panel', style: panelStyle, role: 'dialog', 'aria-label': tr('panel.title') },
							h(
								'div',
								{ className: 'dsh-nb-head' },
								h('span', { className: 'dsh-nb-title' }, tr('panel.title')),
								h('button', { type: 'button', className: 'dsh-nb-close', title: tr('close'), onClick: () => setOpen(false) }, '×'),
							),
							h('div', { className: 'dsh-nb-body' }, prioritySection, h('div', { className: 'dsh-nb-sep' }), recentSection),
						)
					: null,
				board,
			);
		}

		function apply(ctx) {
			const errorStore = createErrorStore();
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'notifications-bell: locale');
			ctx.effect(() => injectCss(), 'notifications-bell: styles');
			ctx.effect(() => {
				let dispose;
				try {
					dispose = ctx.remote.$on('api-session/error', (sessionId, message) => {
						if (typeof sessionId !== 'string' || sessionId === '') return;
						console.warn('[notifications-bell] session stopped unexpectedly:', sessionId, message);
						errorStore.mark(sessionId);
					});
				} catch (error) {
					console.warn('[notifications-bell] cannot subscribe to session failures:', error);
					return () => {};
				}
				return () => {
					if (typeof dispose === 'function') dispose();
				};
			}, 'notifications-bell: failure stream');
			ctx.effect(
				() =>
					ctx.slots.inject('shell.overlay', () =>
						ctx.slots.register(
							{
								name: 'shell.overlay',
								id: 'notifications-bell',
								order: 100,
								locale: NS,
								inject: () => ({
									openSession: (sessionId) => ctx.get('uiWorkspace').openSession(sessionId),
									errorStore,
								}),
							},
							NotificationsOverlay,
						),
					),
				'notifications-bell: overlay',
			);
		}

		return {
			inject: ['slots', 'locale', 'uiWorkspace', 'remote'],
			apply,
		};
	},
});

// build 2026-11-06T17:05 jump-single-status
