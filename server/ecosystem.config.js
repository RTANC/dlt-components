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
          JWT_KEY: 'gcs.dlt.co.th',
          AUTH_ID: '123456789',
          PORT: 3001,
          JSREPORT_URL: 'http://localhost',
          JSREPORT_USERNAME: 'admin',
          JSREPORT_PASSWORD: '123456789',
        },
        env_production: {
          NODE_ENV: "production",
          JWT_KEY: 'gcs.dlt.co.th',
          AUTH_ID: '123456789',
          PORT: 3001,
          JSREPORT_URL: 'http://localhost',
          JSREPORT_USERNAME: 'admin',
          JSREPORT_PASSWORD: '123456789',
        }
      }
    ]
  }