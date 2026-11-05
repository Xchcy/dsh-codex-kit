import { mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

/**
 * Host half of the chat-only plugin.
 *
 * A Session with no Workspace cannot be started from the composer: the blank
 * hero requires a workspace before it unlocks. Chat-only sessions therefore
 * live in a dedicated `Chats` Workspace at `<home>/.dsh/chats`, and this half
 * makes sure that directory exists before the client tries to attach to it.
 *
 * The client side locates the same directory from `ctx.remote.$host.home`, so
 * a delete by hand is healed on the next application start.
 */
const chatsDirectory = () => join(homedir(), '.dsh', 'chats');

export const name = '@local/dsh-chat-only';

export function apply(ctx) {
  const dir = chatsDirectory();
  ctx.effect(
    () => {
      let disposed = false;
      const ready = mkdir(dir, { recursive: true }).catch((error) => {
        if (!disposed) console.warn('[chat-only] could not ensure ' + dir + ':', error);
      });
      return () => {
        disposed = true;
        void ready;
      };
    },
    'chat-only: chats directory',
  );
}
