import {
  Message,
  MessageReaction,
  PartialMessage,
  PartialMessageReaction,
} from 'discord.js';

const isMessageFromChannelMemes = (
  message: Message | PartialMessage
): boolean => {
  return message.channelId === process.env.DISCORD_MEMES_CHANNEL_ID;
};

/**
 * Conditions to be a meme:
 *
 * - Check if the message is from the memes channel.
 * - Check if message has 1 attachment.
 */
export const isMeme = async (
  msg: MessageReaction | PartialMessageReaction | Message
): Promise<boolean> => {
  let message: Message | PartialMessage;

  if ('message' in msg) {
    /**
     * Message from reactions event.
     */
    message = msg.message;
  } else {
    /**
     * Message from messageCreate event.
     */
    message = msg;
  }

  const conditionsToBeAMeme = [
    isMessageFromChannelMemes(message),
    message.attachments.size == 1,
  ];

  return !conditionsToBeAMeme.includes(false);
};
