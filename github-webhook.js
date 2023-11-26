/* eslint-disable no-console */
require('dotenv/config');

var repo = '~/soseramemes';

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

const EXEC_CMD = [
  `cd ${repo}`,
  'git reset --hard',
  'git pull',
  'npm install',
  'pm2 startOrRestart ecosystem.config.js',
].join(' && ');

console.log('Starting webhook server on port 8080');

http
  .createServer((req, res) => {
    let rawData = '';

    const getPayload = () => {
      try {
        return JSON.parse(rawData);
      } catch (e) {
        return {};
      }
    };

    req.on('data', (chunk) => {
      rawData += chunk.toString();
    });

    req.on('end', () => {
      console.log('Webhook received');

      let sig =
        'sha1=' +
        crypto
          .createHmac('sha1', process.env.WEBHOOK_SECRET)
          .update(rawData)
          .digest('hex');

      let payload = getPayload();

      const sigMatch = req.headers['x-hub-signature'] == sig;

      const isMain = payload.ref == 'refs/heads/main';

      const isPush = req.headers['x-github-event'] == 'push';

      if (sigMatch && isMain && isPush) {
        console.log('Deploying main branch');
        // eslint-disable-next-line max-params
        exec(EXEC_CMD, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      } else {
        console.log('Nothing to deploy');
      }
    });

    res.end();
  })
  .listen(8080);
