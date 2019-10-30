const database = require("../lib").db;

async function getCustomerById(id) {
    const queryParam = [id];
    let sql = `select id, name, pet_id from customer where id = ?`;
    return database.sqlAction(sql, queryParam).then(res => {
        return res[0];
    }).catch (err => {
        throw err;
    })
}

async function addCustomer() {
    const name = "customer_" + Math.floor(Date.now() / 1000);
    const queryParam = [name];
    let sql = `insert into customer ( name ) values (?)`;

    return database.sqlAction(sql, queryParam).then(res => {
        if (res.affectedRows == 1) {
            return res.insertId;
        } else {
            return { error: "Invalid Request" };
        }
    }).catch ( err => {
        throw err;
    })
}

async function updatePetId(id, pet_id) {
    const queryParam = [pet_id, id]
    let sql = `update customer set pet_id = ? where id = ?`;
    return database.sqlAction(sql, queryParam).then(res => {
        if (res.affectedRows == 1) {
            return { status: "SUCCESS" };
        } else {
            return { error: "Invalid Request" };
        }
    }).catch (err => {
        throw err;
    })
}

module.exports = {
    getCustomerById,
    addCustomer,
    updatePetId
};