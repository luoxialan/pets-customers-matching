const pet = require("../service").pet;

class PetController {
    static async getPetById(ctx) {
        const { id } = ctx.params;
        const data = await pet.getPetById(id)
        ctx.response.status = 200;
        ctx.body = { data }
    }

    static async addPet(ctx) {
        const { name, available_from, age, species, breed } = ctx.request.body;
        const data = await pet.addPet(name, available_from, age, species, breed)
        ctx.response.status = 200;
        ctx.body = { data }
    }

    static async getMatchedCustomer(ctx) {
        const { id } = ctx.params;
        const data = await pet.getMatchedCustomer(id)
        ctx.response.status = 200;
        ctx.body = { data }
    }
}

module.exports = PetController;