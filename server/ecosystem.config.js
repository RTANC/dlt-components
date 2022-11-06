module.exports = {
    apps: [
      {
        name: 'Server',
        script: 'index.js',
  
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '8G',
        ignore_watch : ["public"],
        env_development: {
          NODE_ENV: "development",
          JWT_KEY: 'gcs.dlt.co.th',
          PORT: 3001
        },
        env_production: {
          NODE_ENV: "production",
          JWT_KEY: 'gcs.dlt.co.th',
          PORT: 3001
        }
      }
    ]
  }