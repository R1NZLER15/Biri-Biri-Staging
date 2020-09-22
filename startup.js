exports.startup = function(bot){
	bot.on('ready', () => {
		bot.user.setActivity('n!help V4.0', { type: 'WATCHING', url: 'https://twitch.tv/thekazuo'});
		console.log("")
		
		console.log(`Bot iniciado, con ${bot.users.cache.size} usuarios, en ${bot.guilds.cache.size} servidor/es.`);
		console.log("")
  });

  bot.on('error', console.error);

  bot.on('message', (msg) => {
		if (msg.content == "n!globalinfo") {
			const utils = require('./core/utils.js')
			msg.channel.send({embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL()
				},
				title: "Informacion del bot",
				fields: [{
						name: "Cantidad de servidores",
						value: `${bot.guilds.cache.size}`,
						inline: true
					},
					{
						name: "Cantidad de usuarios",
						value: `${bot.users.cache.size}`,
						inline: true
					},
					{
						name: "Voice Chats",
						value: `${bot.channels.cache.size}`,
						inline: true
					},
					{
						name: "Cantidad de Emojis",
						value: `${bot.emojis.cache.size}`,
						inline: true
					},
					{
						name: "Websocket",
						value: `${bot.ws.ping} ms ❤`,
						inline: true
					},
					{
						name: "Uptime",
						value: utils.msToTime(bot.uptime),
						inline: true
					}
				]
			}
		});
		}
	});

	bot.on('guildMemberAdd', (gm) => {
      try {
	     console.log(`added user<@${gm.id}>`);
	     //gm.send(`Bienvenido <@${gm.id}> <:vohiyo:412474913883160577>`);
      } catch(err) {
        console.log(err)
      }
	});

	bot.on("disconnect", event => {
	  console.log(`Disconnected: ${event.reason} (${event.code})`);
	});
};
