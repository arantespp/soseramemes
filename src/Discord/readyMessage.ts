import { EMOJIS_POINTS, MIN_POINTS_TO_TWEET_MEME } from './score';

const pointsText = Object.entries(EMOJIS_POINTS)
  .map(([emoji, point]) => {
    return `${emoji} vale ${point} pontos`;
  }, '')
  .join(' ');

export const readyMessage = [
  `O bot ta on 🚀 Como funciona?`,
  `Mandem os memes e votem! Se a mensagem tiver ${MIN_POINTS_TO_TWEET_MEME} pontos, o tuíte é feito. ${pointsText}.`,
].join('\n');
