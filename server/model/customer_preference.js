const database = require("../lib").db;

async function addPreference(preference) {
    const { customer_id, type, value } = preference
    let value1 = value
    let value2 = null
    let sql = `insert into customer_preference ( customer_id, type, value1) values ('${customer_id}', '${type}', '${value1}')`

    if (type == "age") {
        value1 = value.from
        value2 = value.to
        sql = `insert into customer_preference ( customer_id, type, value1, value2 ) values ('${customer_id}', '${type}', '${value1}', '${value2}')`
    }

    return database
        .sqlAction(sql)
        .then(res => {
            if (res.affectedRows == 1) {
                return res.insertId
            } else {
                return { error: "Invalid Request" }
            }
        })
        .catch(err => {
            throw err
        });
}

async function getPreferences(customerId) {
    let sql = `select * from customer_preference where customer_id = ${customerId}`
    return database
        .sqlAction(sql)
        .then(res => {
            return res
        })
        .catch(err => {
            throw err
        });
}

module.exports = {
    addPreference,
    getPreferences
}
