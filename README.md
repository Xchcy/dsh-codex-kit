# DSH Codex 风格插件集

三个**互相独立、可单独安装/卸载**的 [DeepSeek Harness](https://github.com/deepseek-ai) 客户端插件，把 DSH 的侧边栏、会话浏览与通知改造成更接近 Codex 的工作流。

在 DSH 0.2.1-rc.5（Electron 44 / Windows）上开发并实测。

| 插件 | 目录 | 作用 |
| --- | --- | --- |
| 仅聊天模式 | `chat-only/` | 侧边栏底部新增「✏️ 仅聊天」按钮，一键在 `~/.dsh/chats`（「聊天」工作区）打开空白会话，不依附任何项目。 |
| 项目 / 最近 浏览器 | `projects-browser/` | 替换原生侧边栏工作区区：可折叠的「置顶」「项目」「最近」「已归档」；每行右侧 `⋯` 菜单支持置顶 / 取消置顶 / 归档 / 恢复。 |
| 通知铃铛 | `notifications-bell/` | 侧边栏右上角铃铛：等待审批 = 黄点，意外停止 = 红点，已完成 = 蓝点；点开按「正在工作 → 等待审批 → 意外停止 → 已完成」优先显示，下方是最近的会话。 |

## 预览

| 侧边栏 | 置顶分区 | 置顶 / 归档菜单 |
| --- | --- | --- |
| ![](screenshots/sidebar-sessions.png) | ![](screenshots/pinned-section.png) | ![](screenshots/blank-session-hidden.png) |

| 铃铛面板 | 「正在工作」小点动画（4 帧） |
| --- | --- |
| ![](screenshots/bell-panel.png) | ![](screenshots/running-dots-4frames.png) |

| 意外停止（红点，非主动停止） |
| --- |
| ![](screenshots/sidebar-red-mark.png) |

## 安装

每个插件都是标准的 DSH bundle（`package.json` + `cordis.patch.yml` + `index.js` + `client.js` + `locale/` + `icon.svg`）。任选其一或全部安装：

在 DSH 会话里执行（把路径换成你本地的仓库目录）：

```
plugin_manager action=install_bundle target="<repo>/chat-only"
plugin_manager action=install_bundle target="<repo>/projects-browser"
plugin_manager action=install_bundle target="<repo>/notifications-bell"
```

插件会以 `link:` 方式登记到当前 profile（`~/.dsh/profiles/<profile>`），之后**修改插件文件并刷新页面**（DevTools 打开后 `Ctrl+Shift+R`）即可重新加载。新装插件会立即生效，但已经注册过的插槽代码需要刷新页面才会换成新版本。

禁用 / 卸载：

```
plugin_manager action=list_plugins                       # 找到 include:@local/dsh-xxx
plugin_manager action=set_plugin target=include:@local/dsh-xxx enabled=false
plugin_manager action=remove_bundle target="@local/dsh-xxx"
```

## 功能细节

### chat-only

- 「✏️ 仅聊天」位于侧边栏底部（原生 `sidebar.footer.action` 插槽），点击后打开「聊天」工作区的空白会话，输入框立即可用。
- 「聊天」工作区固定为 `~/.dsh/chats`，由插件的 host 半边在 DSH 启动时 `mkdir -p` 创建（DSH 的 `workspaces.create` 要求目录已存在）。
- 聊天会话仍然是普通 DSH 会话，只是不属于任何项目：在「项目」中隐藏，只出现在「最近」和铃铛里。

### projects-browser

用自定义实现替换原生 `sidebar.workspaces`（`priority: -10` shadow），从上到下依次是：

1. **置顶**：已置顶的会话单独成区，排在「项目」「最近」之上（原生「更多」面板之下），按最近活动时间排序；取消置顶后回到「最近」。没有置顶会话时整区不显示。
2. **项目**：按工作区列出，可展开显示工作区内会话；标题右侧 `+` 可添加工作区。折叠状态记在 `localStorage["dsh.projectsBrowser.projects"]`。
3. **最近**：聊天会话 + 各工作区会话合并成的扁平列表，按优先级排序（见下表）。新建但从未发过消息的空会话不会出现在任何列表里。
4. **已归档**：默认折叠，展开后可「恢复会话」。

每行右侧 `⋯` 菜单：`置顶会话` / `取消置顶` / `归档会话`；已归档行只有 `恢复会话`。归档正在运行的会话会先弹出确认，确认后先停止再归档。

**「最近」的排序规则**

| 优先级 | 状态 | 行首标记 |
| --- | --- | --- |
| 1 | 正在工作（running） | 灰色方框 8 个小圆点，亮点沿方框循环、带渐隐拖尾（CSS 动画，无 JS 计时器） |
| 2 | 等待审批 / 等待回答 / 等待确认计划 | 黄点 |
| 3 | 意外停止（非用户主动停止） | 红点 |
| 4 | 已完成（有未读完成提示） | 蓝点 |
| 5 | 普通会话 | 无 |

同一优先级内按最后活动时间从新到旧；已置顶的会话不在「最近」中重复出现。

**「意外停止」如何判定**

- 页面运行期间：宿主发出 `api-session/error` 事件时，该会话标红；重新运行或打开会话后清除。
- 进程被强制结束 / 崩溃 / 关闭超时：这类情况宿主不会发出事件，但客户端会把「自己看到过正在运行、却始终没有看到结束」的会话记到 `localStorage["dsh.projectsBrowser.interruptedTurns"]`。下次 DSH 启动时这些会话显示红点（即「任务已停止」的那一轮），打开会话或重新运行后清除，超过 30 天的记录自动清理。

### notifications-bell

- 铃铛固定在侧边栏右上角（`shell.overlay` 插槽，不依赖原生侧边栏内部结构）。颜色点表示当前最高优先级：黄（有等待审批）> 红（有意外停止）> 蓝（有已完成）。
- 点开后是通知面板：「优先」区依次为 正在工作 / 等待审批 / 意外停止 / 已完成；「最近」区为按优先级排序的会话，右侧显示「今天 HH:MM / 昨天 / 星期几 / 年月日」。
- 点击任一会话直接打开；点击面板外或按 `Esc` 关闭。
- 与 projects-browser 使用同一套状态判定规则；两者可以同时安装，也可以只装一个。

## 已知限制

- 三个插件都依赖 DSH 当前的客户端插槽与 API（`sidebar.footer.action`、`sidebar.workspaces`、`shell.overlay`、`uiWorkspace`、`useSessions` / `useSessionStatus` / `useWorkspaces`）；DSH 升级后若这些接口变化需要跟进。
- 「意外停止」不能回溯历史：只对当前页面期内发生的事件，或上一次运行留下的「正在运行」记录生效；更早的错误不会显示。
- 空白会话（新建后未发送任何消息）：当前 DSH 没有删除会话的 RPC，插件只能把它们从所有列表和铃铛中隐藏；DSH 新建会话时会复用空白会话，因此不会无限堆积。
- 侧边栏窄到折叠为 rail 时，行内菜单与铃铛不可见，展开侧边栏即可。
- 状态与排序来自客户端实时数据，刷新页面后才会重新计算「意外停止」的红点记录。

## 目录结构

```
chat-only/            # 插件 1：仅聊天按钮
  client.js           # 浏览器端：注册 sidebar.footer.action
  index.js            # host 端：启动时创建 ~/.dsh/chats
  package.json        # @local/dsh-chat-only
  cordis.patch.yml    # 插件条目声明
  locale/{zh,en}.json
  icon.svg
projects-browser/     # 插件 2：项目 / 最近 / 置顶 / 已归档
  client.js           # shadow sidebar.workspaces，自绘分区与行菜单
  ...
notifications-bell/   # 插件 3：铃铛与通知面板
  client.js           # shell.overlay 注册浮层
  ...
screenshots/          # 实机截图
```

## 开发说明

`client.js` 由 DSH 的客户端模块加载器装载：

```js
window.__ModuleLoader__.load({
  id: '@local/dsh-projects-browser',
  factory(require) {
    // ...
    return {
      inject: ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace', 'remote'],
      apply(ctx) {
        ctx.effect(() => ctx.slots.register({ /* slot, id, order, priority */ }, () => {
          /* component */
        }), 'entry-id');
      },
    };
  },
});
```

- **插槽规则**：single 插槽（如 `sidebar.workspaces`）若要替换原生内容，必须以不同 `priority` 注册（如 `-10`，最低者生效）；想要在插件内部绘制子插槽，必须在注册时声明 `children`，但已声明的子名不能重复声明。
- **root props**：`renderSlot` 会向 entry 注入 root 级 hooks —— `useSessions`、`useSessionStatus`、`useWorkspaces`、`usePanelInfo`、`t` 等；插件自己的 `inject` 值也会作为 props 传入。
- **样式**：全部为插件自带的 `dsh-pb-*` / `dsh-nb-*` 类名 + DSH 的 `--dsw-alias-*` CSS 变量，不侵入宿主样式。
- **本地化**：`ctx.locale.register(namespace, { zh, en })`，界面文案走 `t('key')`。
- 修改 `client.js` 后刷新页面；若开发服务器残留旧 bundle，可重启 DSH 应用。

## License

MIT
