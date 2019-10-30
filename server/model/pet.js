const database = require("../lib").db;
const constants = require("../config");

async function addPet(pet) {
    let { name, age, species, breed } = pet;
    sql = `insert into pet (name, age, species, breed ) values (?, ?, ?, ?)`;
    if(species != 'dog') {
        breed = null
    }
    const queryParam = [name, age, species, breed]
    return database.sqlAction(sql, queryParam).then(res => {
        if (res.affectedRows == 1) {
            return getPet(res.insertId);
        } else {
            return { error: "Invalid Request" };
        }
    }).catch ( err => {
        return { error: err.message };
    })
}

async function getPet(id) {
    const queryParam = [id]
    let sql = `select id, name, available_from, age, species, breed, status from pet where id = ?`;
    return database.sqlAction(sql, queryParam).then(res => {
        res.forEach(row => {
            const status = row['status'];
            row['status'] = constants.PET_STATUS[status];
        });
        return res[0];
    }).catch (err => {
        throw err;
    })
}

async function updatePetStatus(id, status) {
    const queryParam = [status, id]
    let sql = `update pet set status = ? where id = ?`;
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

async function getPetByPreference(preferences) {
    let { from, to, species, breed} = preferences
    let sql = `select id, name, available_from, age, species, breed, status from pet where status = 0 AND available_from < NOW() `
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

async function getMatchedCustomer(id) {
    let sql = `select distinct p.id as customer_id, p.name from pet, (select c.id, c.name, a.value1 as age_from, a.value2 as age_to, s.value1 as species_value, b.value1 as breed_value from customer c `;
    sql += `LEFT JOIN (select * from customer_preference `
    sql += `WHERE type = 'age') a ON a.customer_id = c.id `
    sql += `LEFT JOIN (select * from customer_preference `
    sql += `WHERE type = 'species') s ON s.customer_id = c.id `
    sql += `LEFT JOIN (select * from customer_preference `
    sql += `WHERE type = 'breed') b ON s.customer_id = b.customer_id AND s.value1 = 'dog' `
    sql += `WHERE pet_id IS NULL) p `
    sql += `WHERE p.age_from <= pet.age AND p.age_to >= pet.age `
    sql += `AND (p.species_value IS NULL `
    sql += `OR (p.species_value IS NOT NULL AND pet.species = p.species_value AND (p.breed_value IS NULL OR pet.breed = p.breed_value)))`
    sql += `AND pet.id = ? AND pet.status = 0 AND available_from <= NOW() `

    const queryParam = [id]

    return database.sqlAction(sql, queryParam).then(res => {
        return res;
    }).catch (err => {
        throw err;
    })
}

module.exports = {
    addPet,
    getPet,
    updatePetStatus,
    getPetByPreference,
    getMatchedCustomer
};