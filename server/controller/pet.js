const pet = require("../service").pet;

class PetController {
    static async getPetById(ctx) {
        const { id } = ctx.params;
        const data = await pet.getPetById(id)
        let status_code = 1;
        if (typeof data === 'undefined') {
            status_code = 404;
            const message = 'not.found';
            return { status_code, data: message };
        }
        return { status_code, data };
    }

    static async addPet(ctx) {
        const { name, age, species, breed } = ctx.request.body;
        const data = await pet.addPet(name, age, species, breed)
        return data
    }

    static async getMatchedCustomer(ctx) {
        const { id } = ctx.params;
        const data = await pet.getMatchedCustomer(id)
        return data
    }
}

module.exports = PetController;