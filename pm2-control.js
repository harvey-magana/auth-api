const pm2 = require('pm2');

pm2.connect(function(err) {
  if(err) {
    console.error(err);
    process.exit(2)
  }

  pm2.start({
    script: 'index.js',
    name: 'auth-api'
  }, function(err, apps) {
    if(err) {
      console.error(err, apps)
      return pm2.disconnect()
    }
    pm2.list((err, list) => {
      console.log(err, list)

      pm2.restart('auth-api', (err, proc) => {
        pm2.disconnect();
      })
    })
  })
})