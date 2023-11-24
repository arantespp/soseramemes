import { Message, PartialMessage } from 'discord.js';
import { TwitterApi } from 'twitter-api-v2';
import { getMessageContent } from '../Discord/getMessageContent';
import 'dotenv/config';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_KEY_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const uploadMediaToTwitter = async (
  message: Message | PartialMessage
) => {
  try {
    const attachment = message.attachments.first();

    if (!attachment) {
      throw new Error('No attachment found');
    }

    const image = await fetch(attachment.url);

    const buffer = Buffer.from(await image.arrayBuffer());

    const newBuffer = buffer;

    const mimeType = attachment.contentType || undefined;

    const mediaId = await client.v1.uploadMedia(newBuffer, {
      mimeType,
    });

    return { mediaId, mimeType, buffer: newBuffer };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const tweetMeme = async (message: Message | PartialMessage) => {
  try {
    const content = await getMessageContent(message);

    const uploadedMedia = await uploadMediaToTwitter(message);

    if (!uploadedMedia) {
      return undefined;
    }

    const { mediaId } = uploadedMedia;

    const mediaIds = mediaId ? [mediaId] : undefined;

    const tweet = await client.v2.tweet(content, {
      media: {
        media_ids: mediaIds,
      },
    });

    const tweetUrl = `https://twitter.com/soseramemes/status/${tweet.data.id}`;

    return { tweetUrl };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
