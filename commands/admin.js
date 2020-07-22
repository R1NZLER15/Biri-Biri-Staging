const commands = require('../core/command.js')
const send = require('../core/utils.js').sendText
const CustomCommand = commands.CustomCommand

exports.getCommands = (clients) => {
  return [
    new CustomCommand({
      'name': 'comando',
      'execute': (msg) => {
        let has_admin     = msg.member.permissions.has("ADMINISTRATOR")   // Check if the user has admin
        let has_manage    = msg.member.permissions.has("MANAGE_MESSAGES") // Check if the user has Manage Messages
        
        // Check if a member has a specific permission on the guild!
        if (!has_admin || !has_manage){
          return send(msg, 'Necesitas ser un admin, pendejo')
        }

        let maybeCommand = msg.content.trim().split(/\s+/)[1]
        if(maybeCommand === undefined) {
          return send(msg, 'Necesitas especificar un comando, pendejo')
        }
        if(maybeCommand === 'comando') {
          return send(msg, 'No <:wanwan:403968696067948554>')
        }

        let command = clients.dispatcher.getCommandByName(maybeCommand)
        let hasCommand = command !== undefined
        if(!hasCommand) {
          return send(msg, `Comando \`${maybeCommand}\` no encontrado`)
        }

        let maybeAction = msg.content.trim().split(/\s+/)[2]
        if(maybeAction !== 'activar' && maybeAction !== 'desactivar') {
          return send(msg, `Necesitas especificar una action 'activar' o 'desactivar', pendejo`)
        }
        let action = (maybeAction === 'activar') ? 'activado' : 'desactivado'
        action === 'activado' ? command.enable(msg) : command.disable(msg)
        return send(msg, `Comando ${command.name} ${action}`)
    }
    })
  ]
}
