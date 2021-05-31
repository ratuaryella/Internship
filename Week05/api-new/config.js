module.exports = {
    port: 8081,
    dbConnectionString: 'postgres://postgres:postgresql@127.0.0.1:5432/postgres', // connection to db 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}