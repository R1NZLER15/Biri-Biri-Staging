const { Pool, Client } = require('pg')
const moment = require('moment-timezone')

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
    this.reclamo_pool = new Pool({
      connectionString: process.env.RECLAMO_DATABASE_URL
    })
    this.users = {}
    this.channels = {}
    this.loadChannels()
    this.loadUsers()
  }

  lastSunday() {
    return moment().tz("America/Mexico_City").startOf('week').format('YYYY-MM-DD')
  }  

  async getReclamo(term) {
    const text = `select p.fb_profile_id,p.nombre,r.waifu,r.procedencia,r.img,r.fecha,p.racha,p.casado,p.intocable from reclamo.personas p inner join reclamo.reclamos r on p.fb_profile_id=r.fb_profile_id where waifu like $1 and r.fecha between $2 and now() order by r.id limit 1;`
    const res = await this.reclamo_pool.query(text, [term, this.lastSunday()])
    return res.rows[0]
  }

  async getWaifu(userId) {
    const text = `select * from waifu where usuario = $1`
    const res = await this.pool.query(text, [userId])
    return res.rows[0]
  }

  async loadChannels() {
    const text = 'SELECT command, channel_id FROM channel_command'
    const res = await this.pool.query(text)
    res.rows.forEach(row => {
      this.set_(this.channels, row.command, row.channel_id, false)
    })
  }

  async loadUsers() {
    const text = 'SELECT command, user_id FROM user_command'
    const res = await this.pool.query(text)
    res.rows.forEach(row => {
      this.set_(this.users, row.command, row.user_id, false)
    })
  }

  set_(cache, command, userOrChannel, disableOrEnable) {
    if(cache[command] === undefined)
        cache[command] = {}
      cache[command][userOrChannel] = disableOrEnable
  }

  isEnable_(cache, command, userOrChannel) {
    if(cache[command] === undefined) return true
    if(cache[command][userOrChannel] === undefined) return true
    return cache[command][userOrChannel]
  }

  isCommandEnableForChannel(command, channel) {
    return this.isEnable_(this.channels, command, channel)
  }

  isCommandEnableForUser(command, user) {
    return this.isEnable_(this.users, command, user)
  }

  async disableCommandForChannel(command, channel) {
    this.set_(this.channels, command, channel, false)
    const text = 'INSERT INTO channel_command (command, channel_id) VALUES ($1, $2) ON CONFLICT DO NOTHING'
    const values = [command, channel]
    return await this.pool.query(text, values)
  }

  async disableCommandForUser(command, user) {
    this.set_(this.users, command, user, false)
    const text = 'INSERT INTO user_command (command, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING'
    const values = [command, user]
    return await this.pool.query(text, values)
  }

  async enableCommandForChannel(command, channel) {
    this.set_(this.channels, command, channel, true)
    const text = 'DELETE FROM channel_command WHERE command=$1 AND channel_id=$2'
    const values = [command, channel]
    return await this.pool.query(text, values)
  }

  async enableCommandForUser(command, user) {
    this.set_(this.users, command, user, true)
    const text = 'DELETE FROM user_command WHERE command=$1 AND user_id=$2'
    const values = [command, user]
    return await this.pool.query(text, values)
  }

}

exports.db = new Database()
