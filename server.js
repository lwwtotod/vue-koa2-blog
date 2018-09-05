require('babel-register')({
  'presets': [
    ['env', {
      'targets': {
        'node': true
      }
    }]
  ]
})
require('./app.js')
