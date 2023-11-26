# Só Será Memes

![Só Será Memes logo](./logo.jpg).

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

## Development

To run the bot locally and watch for changes, run:

```bash
npm run dev
```

To run the bot locally without watching for changes, run:

```bash
npm run start
```

## Test

To run the tests, run:

```bash
npm test
```

## Server

We use PM2 to run and keep soseramemes online. Provisioning the server:

```bash
sudo apt update
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install node 20 # As of November 2023
```

Cloning the project via HTTPS:

```bash
git clone https://github.com/arantespp/soseramemes.git
```

Now, to start the server, run:

```bash
npm install
npm run server:start
```

To check the logs, run:

```bash
npm run server:logs
```

If you want to check only error logs, run:

```bash
npm run server:logs --err
```

To check PM2 status, run:

```bash
pm2 status
```
