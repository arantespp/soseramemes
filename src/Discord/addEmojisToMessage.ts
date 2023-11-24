import { EMOJIS_POINTS } from './score';
import { Message } from 'discord.js';
import { isMeme } from './isMeme';

/**
 * Add all emojis to the message to make easy the voting.
 */
export const addEmojisToMessage = async (message: Message) => {
  if (await isMeme(message)) {
    await Promise.all(
      Object.keys(EMOJIS_POINTS).map((emoji) => {
        return message.react(emoji);
      })
    );
  }
};
