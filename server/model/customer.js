const database = require("../lib").db;

async function getCustomerById(id) {
    let sql = `select id, name, pet_id from customer where id = ${id}`;
    return database.sqlAction(sql).then(res => {
        return res[0];
    }).catch (err => {
        console.log('[Model] Customer: getCustomer(), ' + err.message);
        throw new Error('database.excution.error')
    })
}

async function addCustomer() {
    const name = "customer_" + Math.floor(Date.now() / 1000);
    let sql = `insert into customer ( name ) values ('${name}')`;

    return database.sqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return res.insertId;
        } else {
            return { error: "Invalid Request" };
        }
    }).catch ( err => {
        return { error: err.message };
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

async function getCustomerByPreference(preferences) {
    let { from, to, species, breed} = preferences
    let sql = `select * from customer where status = 0 AND available_from < NOW() `
    let isLikeDog = false
    const queryParam = [from, to]

    if(typeof from !== 'undefined' && typeof to !== 'undefined'){
        sql = sql + `and age >= ? and age <= ? `
    }

    if(typeof species !== 'undefined' && species.length > 0){
        isLikeDog = species.includes('dog');
    }

    if(isLikeDog) {
        if(typeof breed !== 'undefined' && breed.length > 0) {
            sql += `and ( (species = 'dog' and breed in ('`+ breed.join("','")+`')) or `
            species = species.filter(function(value, index, arr){
                return value != 'dog';
            });
            sql += `species in ('`+ species.join("','")+`'))`
        }
    } else {
        sql += `and species in ('`+ species.join("','")+`')`
    }

    return database.sqlAction(sql, queryParam).then(res => {
        res.forEach(row => {
            const status = row['status'];
            row['status'] = constants.PET_STATUS[status];
        });
        return res;
    }).catch (err => {
        throw err;
    })
}

module.exports = {
    getCustomerById,
    addCustomer,
    updatePetId
};