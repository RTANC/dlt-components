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
          AUTH_ID: 'dda48367-4133-411d-9bda-24945ec414bb',
          PORT: 3001,
          JSREPORT_URL: 'http://localhost',
          JSREPORT_USERNAME: 'admin',
          JSREPORT_PASSWORD: '123456789',
          SAVE_PATH: 'D:/vehimages/',
          DB_URL: '164.115.45.6',
          DB_NAME: 'GCSDB',
          DB_USERNAME: 'sa',
          DB_PASSWORD: 'rtanc190806+',
          DB_PORT: 1433
        },
        env_production: {
          NODE_ENV: "production",
          JWT_KEY: 'gcs.dlt.co.th',
          AUTH_ID: 'dda48367-4133-411d-9bda-24945ec414bb',
          PORT: 3001,
          JSREPORT_URL: 'http://localhost',
          JSREPORT_USERNAME: 'admin',
          JSREPORT_PASSWORD: '123456789',
          SAVE_PATH: 'D:/vehimages/',
          DB_URL: '172.20.254.230',
          DB_NAME: 'GCSDB',
          DB_USERNAME: 'gcs2017',
          DB_PASSWORD: 'dlt20170101',
          DB_PORT: 1433
        }
      }
    ]
  }