const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')
const db = require('../db/index.js').db

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'reclamo',
    'execute': async (msg) => {
      let term = utils.getMessage(msg)
      if(utils.isEmpty(term)) {
        msg.delete(3000);
        msg.channel.send("No puedo buscar si no ingresas algo <:pacman:420980551105642516>").then(msg =>{msg.delete(4000)})
        return
      }
      let reclamo = await db.getReclamo(term)
      if(reclamo === undefined)
        reclamo = await db.getReclamo(term + "%")
      if(reclamo === undefined)
        reclamo = await db.getReclamo("%" + term + "%")
      if(reclamo === undefined) {
        msg.delete(3000);
        msg.reply("esa persona/waifu no esta en el servidor, intenta nuevamente!").then(msg =>{msg.delete(4000)})
        return
      }
      utils.startTyping(msg)
      let intocable = reclamo.intocable ? "Si" : "No"
      let casado = reclamo.casado ? "Si" : "No"
      var racha
      var candidato

      if(reclamo.racha === '0')
        racha = 'No estas en racha! <a:apepoCry:443975688152940565>'
      else if(reclamo.racha === '1')
        racha = '1 Semana <a:yey:443975690967318541>'
      else
        racha = `${reclamo.racha} Semanas <a:blobdance:432765514440245250>`

      if(parseInt(reclamo.racha) >= parseInt('9')){
        candidato = 'Si <a:happy:443975690870849536>'
      }else{
        candidato = 'No <:SadPepe:491319332199202823>'
      }
      let reply = new message.BaseMessage(msg)
      reply.setTitle("Datos del Reclamo")
      reply.setDescription(`Nombre del/la Reclamador/a : ** ${reclamo.nombre} **`)
      reply.addField("Waifu/Husbando/Trapfu/3D <a:kannadance:419009629113286658>", `${reclamo.waifu}`)

      if(reclamo.intocable)
        reply.addField("Intocable <a:intocable:443975684604428312>", `${intocable}`,true)

      if(reclamo.casado)
        reply.addField("Casado <a:casado:443975698185453569> ",`${casado}`,true)

      let colors = [0x000000, 0xfffd00, 0xff0000, 0x00fd00]
      let color = colors[(reclamo.intocable << 1) | reclamo.casado]
      reply.setColor(color)

      reply.addField("Fecha del ultimo reclamo <a:time_stop:443975698466603008> ",`${reclamo.fecha}`,true)
      reply.addField("Procedencia <a:awow:443975693781565441> ",`${reclamo.procedencia}`,true)
      reply.addField("Racha: ",`${racha}`)
      reply.addField("Candidato a boda: ",`${candidato}`)
      reply.setImage(`${reclamo.img}`)
      reply.setTimestamp()
      msg.channel.send(reply)
      utils.stopTyping(msg)
    }
  })
  ]
}
