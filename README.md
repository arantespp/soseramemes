# Só Será Memes

## How to setup soseramemes

1. Create a bot and retrieve the token. [How to Get a Discord Bot Token](https://www.writebots.com/discord-bot-token/). It should have the following permissions:

   - Send Messages
   - Read Message History

1. Add token to `.env` file with name `DISCORD_TOKEN`.

1. Get memes channel id from Discord and add it to `.env` file with name `DISCORD_MEMES_CHANNEL_ID`.

1. Go to Twitter developer portal and retrieve the tokens and save them to `.env`:

   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_TOKEN_SECRET`
   - `TWITTER_API_KEY`
   - `TWITTER_API_KEY_SECRET`

<!-- 1. Access Meta Business and retrieve the account id. Save it to `.env` file with name `INSTAGRAM_ACCOUNT_ID`.

1. Access [Meta access token tool](https://developers.facebook.com/tools/accesstoken/) and retrieve the access token. Save it to `.env` file with name `INSTAGRAM_ACCESS_TOKEN`. -->

1. Access AWS and retrieve the access key, secret, region, and bucket name. Save them to `.env` file with the following names:

   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_BUCKET_NAME`

Once you have all the tokens, you can run the bot locally with `npm run dev`.

## Server

We use PM2 to run and keep sseramemes online. To start the server, run:

```bash
npm server:start
```

To check the logs, run:

```bash
npm server:logs
```

If you want to check only error logs, run:

```bash
npm server:logs --err
```

To check PM2 status, run:

```bash
pm2 status
```