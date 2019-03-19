const commands = require('../core/command.js')
const message = require('../core/message.js')
const utils = require('../core/utils.js')
const CustomCommand = commands.CustomCommand
const ImageTitleCommand = commands.ImageTitleCommand
const MentionImageTitleCommand = commands.MentionImageTitleCommand

exports.getCommands = (clients) => {
  let config = clients.config
  return [
    new ImageTitleCommand({
      'name': 'dab',
      'image': config.dab.images,
      'title': config.dab.texts
    }),

    new ImageTitleCommand({
      'name': 'wag',
      'image': config.wag.images
    }),

    new ImageTitleCommand({
      'name': 'bailar',
      'image': config.bailar.images
    }),

    new ImageTitleCommand({
      'name': 'suicide',
      'image': config.suicide.images
    }),

    new ImageTitleCommand({
      'name': 'awoo',
      'image': config.awoo.images
    }),

    new ImageTitleCommand({
      'name': 'actitud',
      'image': config.actitud.images
    }),
    
    new ImageTitleCommand({
      'name': 'jueves',
      'image': config.jueves.images
    }),

    new MentionImageTitleCommand({
      'name': 'culear',
      'alias': ['culiar','culiada'],
      'selfError': 'No te puedes culear a ti mismo, pendejo!',
      'image': config.culear.images,
      'title': config.culear.texts
    }),

    new MentionImageTitleCommand({
      'name': 'putear',
      'alias': ['putiar','putiza'],
      'selfError': 'No te puedes putear a ti mismo, pendejo',
      'image': config.putear.images,
      'title': config.putear.texts
    }),

    new MentionImageTitleCommand({
      'name': 'cepillar',
      'alias': ['cepillada','cepillar'],
      'selfError': 'No te puedes cepillar a ti mismo, pendejo!',
      'image': config.cepillar.images,
      'title': config.cepillar.texts
    }),

    new MentionImageTitleCommand({
      'name': 'morder',
      'alias': ['bite'],
      'selfError': 'No te puedes culear a ti mismo, pendejo!',
      'image': config.morder.images,
      'title': config.morder.texts
    }),

    new MentionImageTitleCommand({
      'name': 'wachar',
      'alias': ['mirar','look'],
      'selfError': 'No te puedes mirar a ti mismo, pendejo!',
      'image': config.wachar.images,
      'title': config.wachar.texts
    }),

    new MentionImageTitleCommand({
      'name': 'buitrear',
      'alias': ['buitre'],
      'selfError': 'No te puedes buitrear a ti mismo, pendejo!',
      'image': config.buitrear.images,
      'title': config.buitrear.texts
    }),

    new MentionImageTitleCommand({
      'name': 'apresiar',
      'alias': ['apreciar','praise'],
      'selfError': ' ',
      'image': config.apresiar.images,
      'title': config.apresiar.texts
    }),

    new MentionImageTitleCommand({
      'name': 'secuestrar',
      'alias': ['robar','kidnap'],
      'selfError': 'No te puedes secuestrar a ti mismo, pendejo!',
      'image': config.secuestrar.images,
      'title': config.secuestrar.texts
    }),

    new CustomCommand({
      'name': 'lovecalc',
      'mention': 2,
      'execute': (msg) => {
        utils.startTyping(msg)
        let mention1 = msg.mentions.members.first().user.username
        let mention2 = msg.mentions.members.last().user.username
        let replyMessage = new message.BaseMessage(msg)
        if(mention1 !== mention2) {
          let calculado = Math.floor(Math.random() * 101)
          replyMessage.setTitle('❤ Calculador de Amor ❤')
          replyMessage.addField(`El amor entre ${mention1} y ${mention2} es de`, `${calculado}%`)
          utils.stopTyping(msg)
        }
        else {
          replyMessage.setTitle('Forever alone </3')
        }
        msg.channel.send(replyMessage)
      }
    }),

    new CustomCommand({
      'name': 'ping',
      'execute': (msg) => {
        utils.startTyping(msg)
        latency = new Date().getTime() - msg.createdTimestamp
        let title = latency + ' ms'
        let replyMessage = new message.BaseMessage(msg)
        replyMessage.setTitle(title)
        msg.channel.send(replyMessage)
        utils.stopTyping(msg)
      }
    }),

    new CustomCommand({
      'name': 'rate',
      'execute': (msg) => {
        utils.startTyping(msg)
        let replyMessage = new message.BaseMessage(msg)
        if(msg.content.split(' ').length >= 2) {
          let restMessage = utils.getMessage(msg)
          let calculado = Math.floor(Math.random() * 101)
          let title = `La puntuacion de **${restMessage}** es de **${calculado}**/100`
          replyMessage.setTitle(title)
          utils.stopTyping(msg)
        } else {
          replyMessage.setTitle('Se debe meter algo a alguien para ratear, pendejo')
          utils.stopTyping(msg)
        }
        msg.channel.send(replyMessage)
      }
    }),

    new CustomCommand({
      'name': 'avatar',
      'execute': (msg) => {
        var avatar
        utils.startTyping(msg)
        if(utils.hasMention(msg))
          avatar = msg.mentions.members.first().user.avatarURL
        else
          avatar = msg.author.avatarURL
        if(utils.isEmpty(avatar)) {
          msg.channel.send(new message.BaseMessage(msg).setTitle('Usuario sin avatar'))
          utils.stopTyping(msg)
        } else {
          msg.channel.send(new message.BaseMessage(msg).setImage(avatar))
          utils.stopTyping(msg)
        }
      }
    }),

    new ImageTitleCommand({
      'name': 'birb',
      'image': async () => {
        let params = {
          'url': 'https://random.birb.pw/tweet.json/',
          'json': true
        }
        let response = await clients.request(params)
        return `https://random.birb.pw/img/${response.file}`
      },
      'title': '%(author)s fue pajaredo!!!!!'
    }),

    new ImageTitleCommand({
      'name': 'dog',
      'title': '<:webos:450520773652905984>',
      'image': async () => {
        let params = {
          'url': 'https://dog.ceo/api/breeds/image/random',
          'json': true
        }
        let response = await clients.request(params)
        return response.message
      }
    }),

    new CustomCommand({
      'name': 'roll',
      'execute': (msg) => {
        let maybeNumber = msg.content.trim().split(/\s+/)[1]
        let sides = /^\d{1,3}$/.test(maybeNumber) ? Number.parseInt(maybeNumber) : 6
        let randomNumber = Math.floor(Math.random() * sides) + 1
        let author = utils.getAuthor(msg)
        let title = `**${author}** te sacaste un ${randomNumber} de un dado de ${sides} caras`
        msg.channel.send((new message.BaseMessage(msg)).setTitle(title))
      }
    }),

    new CustomCommand({
      'name': 'f',
      'execute': (msg) => {
        utils.startTyping(msg)
        let mensaje = utils.getMessage(msg)
        let author = utils.getAuthor(msg)
        let description = `**${author}** ha dado sus respetos por ${mensaje} <:sad:403381288188510210>`
        msg.channel.send((new message.BaseMessage(msg)).setDescription(description))
        utils.stopTyping(msg)
      }
    }),

    new CustomCommand({
      'name': 'flip',
      'cooldown': clients.cooldown({'seconds': 30}),
      'execute': (msg) => {
        let author = utils.getAuthor(msg)
        var lado = 'sol'
        var url = 'https://i.imgur.com/3ECJb4T.gif'
        if (Math.round(Math.random()) === 1) {
          lado = 'aguila'
          url = 'https://i.imgur.com/VpcIiTD.gif'
        }
        let replyMessage = new message.BaseMessage(msg)
        let title = `**${author}** te sacaste ${lado}`
        msg.channel.send(replyMessage.setTitle(title).setImage(url))
      }
    })
  ]
}
