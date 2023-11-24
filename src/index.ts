import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { addEmojisToMessage } from './Discord/addEmojisToMessage';
import { handleMemeVoting } from './Discord/handleMemeVoting';
import { readyMessage } from './Discord/readyMessage';
import 'dotenv/config';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    /**
     * https://stackoverflow.com/a/73249884/8786986
     */
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async () => {
  console.log(readyMessage);

  if (!process.env.DISCORD_MEMES_CHANNEL_ID) {
    throw new Error('Missing DISCORD_MEMES_CHANNEL_ID env var');
  }

  const memeChannel = client.channels.cache.get(
    process.env.DISCORD_MEMES_CHANNEL_ID
  ) as TextChannel;

  await memeChannel.send(readyMessage);
});

client.on(Events.MessageCreate, addEmojisToMessage);

client.on(Events.MessageReactionAdd, handleMemeVoting);

client.on(Events.MessageReactionAdd, handleMemeVoting);

client.login(process.env.DISCORD_TOKEN);
