module.exports = {
    apps: [
      {
        name: 'Server',
        script: 'index.js',
  
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 4,
        autorestart: true,
        watch: true,
        max_memory_restart: '8G',
        ignore_watch : ["public"],
        env_development: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        }
      }
    ]
  }