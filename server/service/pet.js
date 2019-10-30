const pet = require("../model").pet;

async function addPet(name, age, species, breed) {
    const petObj = {
        name: name,
        age: age,
        species: species,
        breed: breed
    }
    const data = await pet.addPet(petObj)
    return data
}

async function getPetById(id) {
    const data = await pet.getPet(id)
    return data
}

async function getMatchedPet(preferences) {
    const data = await pet.getPetByPreference(preferences)
    if(typeof data === 'undefined') {
        const err = new Error()
        err.message = 'not.found'
        err.status = '404'
        throw err
    }
    return data
}

async function getMatchedCustomer(id) {
    const data = await pet.getMatchedCustomer(id)
    return data
}

async function updatePetStatus(id, status) {
    const data = await pet.updatePetStatus(id, status)
    return data
}

module.exports = {
    getPetById,
    addPet,
    getMatchedPet,
    getMatchedCustomer,
    updatePetStatus
};
