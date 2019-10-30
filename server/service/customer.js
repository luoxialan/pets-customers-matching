const customer = require("../model").customer;
const pet = require("./pet");
const customerPreference = require("./customer_preference");

async function addCustomer(cus) {
    const customerId = await customer.addCustomer()

    const { from, to, species, breed } = cus
    const preferences = []
    let isLikeDog = false
    if(typeof species !== 'undefined' && species.length > 0 ) {
        isLikeDog = species.includes("dog");
        species.forEach(element => {
            const pre = {
                customer_id: customerId,
                type: 'species',
                value: element
            }
            preferences.push(pre)
        });
    }

    if(isLikeDog && typeof breed !== 'undefined' && species.length > 0 ) {
        breed.forEach(element => {
            const pre = {
                customer_id: customerId,
                type: 'breed',
                value: element
            }
            preferences.push(pre)
        });
    }

    if(typeof from !== 'undefined' || typeof to !== 'undefined') {
            const age = {
                from: from !== 'undefined' ? from : -1,
                to: to !== 'undefined' ? to : 9999
            }
            const pre = {
                customer_id: customerId,
                type: 'age',
                value: age
            }
            preferences.push(pre)
    }
    await customerPreference.addPreferences(preferences)
    const data = {
        customer_id: customerId
    }
    return data
}

async function getCustomerById(id) {
    const cus = customer.getCustomerById(id)
    const {from, to, species, breed} = await customerPreference.getPreferences(id)
    const data = {
        id: id,
        status: cus.pet_id == null ? 'waiting' : 'adopting',
        from,
        to,
        species,
        breed
    }
    return data
}

async function getMatchedPets(id) {
    const preferences = await customerPreference.getPreferences(id)
    const data = await pet.getMatchedPet(preferences)
    return data
}

async function adoptPet(id, pet_id) {
    const cus= await customer.getCustomerById(id)
    const p = await pet.getPetById(pet_id)
    if(typeof cus !== 'undefined' && cus.pet_id == null && typeof p !== 'undefined' && p.status != 'adopted') {
        customer.updatePetId(id, pet_id)
        pet.updatePetStatus(pet_id, 1)
    }
    const message = "SUCCESS"
    const data = {
        message
    }
    return data
}

module.exports = {
    getCustomerById,
    addCustomer,
    getMatchedPets,
    adoptPet
};
