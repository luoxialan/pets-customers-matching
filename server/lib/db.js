const mysql = require("mysql")
const config = require('./../config');

let pool = mysql.createPool(config.DB_OPTIONS);

let sqlAction = (sql, value) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            }
            else {
                connection.query(sql, value, (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    sqlAction
}