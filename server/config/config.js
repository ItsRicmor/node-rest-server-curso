/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000

/**
 *  Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 *  Base de datos
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb://root:124578369!Rjms#@cafe-shard-00-00-z9vpx.mongodb.net:27017,cafe-shard-00-01-z9vpx.mongodb.net:27017,cafe-shard-00-02-z9vpx.mongodb.net:27017/test?ssl=true&replicaSet=cafe-shard-0&authSource=admin&retryWrites=true'
}

process.env.URLDB = urlDB



