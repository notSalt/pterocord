# pterocord

Control your Pterodactyl panel from Discord

## quick start

* Clone the repository: `git clone https://github.com/notSalt/pterocord.git`
* Go in the directory: `cd pterocord`
* Install dependencies: `npm install`
* Set up `config.json`:
  * `discord_token` is your bot token ID
  * `prefix` is your bot prefix
  * `owner` is an array of IDs that has access to commands
  * `panel_host` is the URL for your panel
  * `panel_key` is your panel API key
  * `server_ip` is your Minecraft server's IP
* Start the bot: `npm start`

> For Linux, you can use the "screen" package to keep the bot running in the background.
> You can also use a process manager such as PM2 to keep the bot online.

## config.json

```json
{
  "discord_token": "XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "prefix": "/",
  "owner": ["253907199489736705"],
  "panel_host": "https://panel.example.com/",
  "panel_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "server_ip": "mc.example.com"
}
```
