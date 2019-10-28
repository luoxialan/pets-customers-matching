const customerPreference = require("../model").customer_preference;

async function addPreferences(preferences) {
    let data = "success"
    preferences.forEach(async element => {
        data = await customerPreference.addPreference(element)
    });
    return data
}

async function getPreferences(customerId) {
    let preferences = await customerPreference.getPreferences(customerId)
    const { from, to, species, breed } = processPreference(preferences)
    const data = {
        from,
        to,
        species,
        breed
    }
    return data
}

function processPreference(preferences) {
    let species = []
    let breed = []
    let from = 0
    let to = 0
    preferences.forEach(preference => {
        switch (preference.type) {
            case 'age':
                from = preference.value1 != null ? preference.value1 : 0;
                to = preference.value2 != null ? preference.value2 : 0;
                break;
            case 'species':
                species.push(preference.value1)
                break;
            case 'breed':
                breed.push(preference.value1)
                break;
            default:
                break;
        }
    });

    const result = {
        from,
        to,
        species,
        breed
    }

    return result
}

module.exports = {
    addPreferences,
    getPreferences
};
