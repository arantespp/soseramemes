import { EMOJIS_POINTS, MIN_POINTS_TO_TWEET_MEME } from './score';
import { MessageReaction, PartialMessageReaction } from 'discord.js';
import { isMeme } from './isMeme';
import { tweetMeme } from '../X/tweetMeme';

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyTweeted: string[] = [];

export const handleMemeVoting = async (
  message: MessageReaction | PartialMessageReaction
) => {
  if (!(await isMeme(message))) {
    return;
  }

  /**
   * Calculate message points.
   */
  const points = message.message.reactions.cache.reduce((counter, reaction) => {
    const emoji = reaction.emoji.name;
    const count = reaction.count;

    if (emoji && EMOJIS_POINTS[emoji]) {
      /**
       * `count - 1` to ignore bot's reaction.
       */
      return counter + EMOJIS_POINTS[emoji] * (count - 1);
    }

    return counter;
  }, 0);

  if (points < MIN_POINTS_TO_TWEET_MEME) {
    return;
  }

  if (messagesAlreadyTweeted.includes(message.message.id)) {
    /**
     * Message has already been tweeted.
     */
    return;
  }

  messagesAlreadyTweeted.push(message.message.id);

  try {
    const tweet = await tweetMeme(message.message);

    if (!tweet) {
      throw new Error('Tweet failed');
    }

    await message.message.channel.send(`🚀 ${tweet.tweetUrl}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(JSON.stringify(error, null, 2));
    await message.message.channel.send(`🚨 Error: ${error.message}`);
  }
};
