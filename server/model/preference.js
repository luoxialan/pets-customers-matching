const database = require("../lib").db;
const constants = require("../config");

async function addPreference(preference) {
    const { type, customer_id, value } = preference;
    let sql = `insert into preference (type, customer_id, value) values ('${type}', '${customer_id}', '${value}')`;
    return database.sqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return getOrder(res.insertId);
        } else {
            return { error: "Invalid Request" };
        }
    }).catch ( err => {
        return { error: err.message };
    })
}

module.exports = {
    addPreference
};