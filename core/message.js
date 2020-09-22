const Discord = require('discord.js')

const color = 0xff0000

class BaseMessage extends Discord.MessageEmbed {
  constructor(msg) {
    super()
    this.setColor(color)
    let guild = msg.guild ? `© ${msg.guild.name} ~ ` : "©"
    this.setFooter(guild, 'https://cdn.discordapp.com/emojis/411791637870542851.png')
  }
}

exports.BaseMessage = BaseMessage