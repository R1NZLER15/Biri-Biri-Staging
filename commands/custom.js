const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
let stats = require('fire-emblem-heroes-stats')
const message = require('../core/message.js');
let ascii = require('asciify');

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'video',
    'nsfw': true,
    'execute': async (msg) => {
        let searchTerm = utils.getMessage(msg)
        if(utils.isEmpty(searchTerm)) {
          utils.sendText(msg, 'Aber pendejo, necesito un termino')
          return
        }
        utils.startTyping(msg)
        const Searcher = new clients.pornsearch()
        let videos = await Searcher.videos()
        if(videos === undefined || videos.length === 0) {
          utils.sendText(msg, `No terminos encontrados para "${searchTerm}"`)
        } else {
          msg.channel.send(`Titulo: ${videos[0].title}`)
          msg.channel.send(`Url: ${videos[0].url}`);
          utils.stopTyping(msg)
        }
    }
  }),

  new CustomCommand({
    'name': 'ascii',
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)
      if(utils.isEmpty(searchTerm)) {
        utils.sendText(msg, 'Aber pendejo, dame algo para dibujar')
        return
      }
    utils.startTyping(msg)
    let codigo = "```"
    ascii(searchTerm,{font:'standard'},function(err,res){
      msg.channel.send(`${codigo}${res}${codigo}`);
      utils.stopTyping(msg)
    });
    }
  }),

  new CustomCommand({
    'name': 'hero',
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)
      if(utils.isEmpty(searchTerm)){
        utils.sendText(msg, 'Aber pendejo, dame algo para buscar')
        return
      }
      let info = stats.getHero(`${searchTerm}`)
      let name = info.name;
      msg.channel.send(`${name}`)
    }
  }),

  new CustomCommand({
    'name': 'invite',
    'execute' : async (msg) =>{
      utils.startTyping(msg)
      let reply = new message.BaseMessage(msg)
        reply.setTitle(`🎉🎉 Invitación / Invite 🎉🎉`)
        reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
        reply.setDescription("Haz click [Aqui](https://discordapp.com/oauth2/authorize?client_id=429093104474128394&scope=bot&permissions=8), para invitarme a tu servidor!")
        reply.setColor(0x74DF00)
        msg.channel.send(reply)
        utils.stopTyping(msg)
    }
  }),

  new CustomCommand({
    'name': 'serverinfo',
    'execute': (msg) => {
      utils.startTyping(msg)
      let reply = new message.BaseMessage(msg)
      reply.setColor(0x74DF00)
      reply.setThumbnail(msg.guild.iconURL)
      reply.setTitle(`Información de ${msg.guild}`, true)
      reply.addField("Dueño del Servidor", msg.guild.owner, true)
      reply.addField("Usuarios", msg.guild.memberCount, true)
      reply.addField("Creado el ", utils.formatDate(msg.guild.createdAt), true)
      msg.channel.send(reply)
      utils.stopTyping(msg)
    }
  }),

  new CustomCommand({
    'name': 'userinfo',
    'execute': (msg) => {
      utils.startTyping(msg)
      let user = msg.mentions.users.first() || msg.author;
      let join = user.createdAt || msg.author.createdAt;

      let reply = new message.BaseMessage(msg)
      reply.setColor(0x74DF00)
      reply.setThumbnail(user.avatarURL)
      reply.setTitle(`Información de ${user.username}`, true)
      reply.addField(`Nombre Completo:`, user.tag, true)
      reply.addField(`Nickname:`, user.username, true)
      reply.addField("Se unió a discord el: ", utils.formatDate(join),true)
      msg.channel.send(reply)
      utils.stopTyping(msg)
    }
  }),

  new CustomCommand({
    'name': 'choose',
    'execute': (msg) => {
      let items = msg.content.split(" ").slice(1);
      if (items.length <= 1){
        msg.delete();
        return msg.channel.send("Necesito más de un item para elegir, pendejo")
      }
      utils.startTyping(msg)
      let choose = items[Math.floor(Math.random() * items.length)];
      msg.channel.send(`**Yo elijo** ${choose} 🎱`);
      utils.stopTyping(msg)
    }
  }),

  new CustomCommand({
    'name': 'joto',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        utils.startTyping(msg)
        msg.channel.send(`**${collected.first().author.username}** es joto <:pacman:420980551105642516>`);
        utils.stopTyping(msg)
      }).catch(() => {
        utils.startTyping(msg)
        msg.channel.send('Nadie escribió nada :c')
        utils.stopTyping(msg)
      })
    }
  }),

  new CustomCommand({
    'name': 'umiyar',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        let reply = new message.BaseMessage(msg)
        utils.startTyping(msg)
        reply.setTitle(`**${collected.first().author.username}** te umiyaron`)
        reply.setColor(0x74DF00)
        reply.setImage("https://cdn.discordapp.com/emojis/449830856211693578.png")
        msg.channel.send(reply)
        utils.stopTyping(msg)
      }).catch(() => {
        msg.channel.send('Nadie escribió nada :c')
        utils.stopTyping(msg)
      })
    }
  })
  ]
}
