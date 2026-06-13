module.exports = {
  apps : [{
    name   : "auth-api",
    script : "./index.js",
    watch: true,
    env_production: {
      "PORT": 80,
      "NODE_ENV": "production"
    },
    env: {
      "PORT": 3000,
      "NODE_ENV": "development"
    }
  }]
}
