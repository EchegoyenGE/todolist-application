const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'bef1aboblibbgmfdiwhm-mysql.services.clever-cloud.com',
    database: 'bef1aboblibbgmfdiwhm',
    user: 'ulz1wian33fegymb',
    password: '9dICtEeMrI0dFMgdB0TF'
})

mysqlConnection.connect((error) => {
    if (error) {
        console.log('Error: ', error)
    } else {
        console.log('Connection successful')
    }
})

module.exports = mysqlConnection