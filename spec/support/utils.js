const config = require('../../commands/config.json')

function expectNotEmpty (value) {
  expect(value !== undefined).toBeTruthy()
  expect(value !== '').toBeTruthy()
}
exports.expectNotEmpty = expectNotEmpty

function expectUrl(value) {
  expect(/^https?:\/\/.*$/.test(value)).toBeTruthy()
}
exports.expectUrl = expectUrl

exports.expectTitleImage = (msg, expectedTitle, expectedImage) => {
  expectNotEmpty(msg.title)
  expect(msg.title).toBe(expectedTitle)
  expectNotEmpty(msg.image.url)
  expectUrl(msg.image.url)
  expect(msg.image.url).toBe(expectedImage)
}

exports.expectExec = (msg, commands, dispatch, execute) => {
  let responseCommands = dispatch(msg, commands)
  expect(responseCommands.length).toBe(1)
  execute(msg, responseCommands)
}

exports.makeFakeClients = () => {
  return {
    'neko': {
      'getSFWPat': () => ({'url': 'https://example.com/pat.png'})
    },
    'config': {
      'neko': {
        'messages': {
          'pat': 'pat message'
        }
      }
    },
    'cooldown': (_) => undefined,
    'trello': {},
    'neko': {
      'getSFWPat': () => { return { 'url': 'https://neko.com/Pat.png'}},
      'getSFWKiss': () => { return { 'url': 'https://neko.com/Kiss.png'}},
      'getSFWSlap': () => { return { 'url': 'https://neko.com/Slap.png'}},
      'getSFWHug': () => { return { 'url': 'https://neko.com/Hug.png'}},
      'getSFWPoke': () => { return { 'url': 'https://neko.com/Poke.png'}},
      'getSFWFeed': () => { return { 'url': 'https://neko.com/Feed.png'}},
      'getSFWCuddle': () => { return { 'url': 'https://neko.com/Cuddle.png'}},
      'getSFWNeko': () => { return { 'url': 'https://neko.com/Neko.png'}},
      'getSFWTickle': () => { return { 'url': 'https://neko.com/Tickle.png'}},
      'getSFWLizard': () => { return { 'url': 'https://neko.com/Lizard.png'}},
      'getSFWFoxGirl': () => { return { 'url': 'https://neko.com/FoxGirl.png'}},
      'getSFWNekogif': () => { return { 'url': 'https://neko.com/Nekogif.png'}},
      'getSFWKemonomimi': () => { return { 'url': 'https://neko.com/Kemonomimi.png'}},
      'getSFWHolo': () => { return { 'url': 'https://neko.com/Holo.png'}}
  },
    'request': {},
    'cooldown': {},
    'pornsearch': {},
  }
}