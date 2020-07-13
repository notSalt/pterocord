const Discord = require('discord.js')
const Pterodactyl = require('nodeactyl')
const axios = require('axios')
const config = require('./config.json')

const client = new Discord.Client()
const app = Pterodactyl.Client

client.once('ready', async () => {
  await app.login(config.panel_host, config.panel_key, (logged_in, msg) => {
    if (msg) return console.log(`Failed to log in: ${msg}`)
    console.log(logged_in ? 'Successfully logged in' : 'Failed to log in')
  })

  await app.getAllServers()
    .then(res => {
      client.server = res[0].attributes.identifier
    })

  client.setInterval(async () => {
    axios.get(`https://mcapi.xdefcon.com/server/${config.server_ip}/players/json`)
      .then(res => {
        const { players } = res.data
        client.user.setActivity(`${players} players online`, {type: 'WATCHING'})
      })
  }, 5000)
})

client.on('message', async message => {
  if (message.author.bot) return
  if (!config.owner.includes(message.author.id)) return
  if (!message.content.startsWith(config.prefix)) return

  const cmd = message.content.split(' ')[0].slice(1)
  if (cmd === 'cmd') {
    app.sendCommand(client.server, message.content.split(' ').splice(1).join(' '))
      .then(res => message.channel.send(res))
      .catch(err => message.channel.send(err))
  } else if (cmd === 'start') {
    app.startServer(client.server)
      .then(res => message.channel.send(res))
      .catch(err => message.channel.send(err))
  } else if (cmd === 'restart') {
    app.restartServer(client.server)
      .then(res => message.channel.send(res))
      .catch(err => message.channel.send(err))
  } else if (cmd === 'stop') {
    app.stopServer(client.server)
      .then(res => message.channel.send(res))
      .catch(err => message.channel.send(err))
  } else if (cmd === 'kill') {
    app.killServer(client.server)
      .then(res => message.channel.send(res))
      .catch(err => message.channel.send(err))
  } else if (cmd === 'status') {
    const cpuUsage = await app.getCPUUsage(client.server)
    const ramUsage = await app.getRAMUsage(client.server)
    const diskUsage = await app.getDiskUsage(client.server)

    const embed = new Discord.MessageEmbed()
      .addField('CPU', `${Math.round(cpuUsage.current)}%`, true)
      .addField('RAM', `${ramUsage.current}MB`, true)
      .addField('Disk', `${diskUsage.current}MB`, true)

    message.channel.send(embed)
  }
})


client.login(config.discord_token)