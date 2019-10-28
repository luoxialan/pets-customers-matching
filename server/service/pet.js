const pet = require("../model").pet;

async function addPet(name, available_from, age, species, breed) {
    const petObj = {
        name: name,
        available_from: available_from,
        age: age,
        species: species,
        breed: breed
    }
    const data = await pet.addPet(petObj)
    return data
}

async function getPetById(id) {
    const data = await pet.getPet(id)
    if(data.species != 'dog') {
        delete data.breed;
    }
    return data
}

async function getMatchedPet(preferences) {
    const data = await pet.getPetByPreference(preferences)
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
