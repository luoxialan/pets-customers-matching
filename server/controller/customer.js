const customer = require("../service").customer;

class CustomnerController {
    static async getCustomerById(ctx) {
        let { id } = ctx.params;
        let data = await customer.getCustomerById(id)
        ctx.response.status = 200;
        ctx.body = { data }
    }

    static async addCustomer(ctx) {
        const { from, to, species, breed } = ctx.request.body;
        const cus = {
            from,
            to,
            species,
            breed
        }
        const data = await customer.addCustomer(cus)
        ctx.response.status = 200;
        ctx.body = { data }
    }

    static async getMatchedPets(ctx) {
        let { id } = ctx.params;
        let data = await customer.getMatchedPets(id)
        ctx.response.status = 200;
        ctx.body = { data }
    }

    static async adoptPet(ctx) {
        let { id } = ctx.params;
        let { pet_id } = ctx.query;
        let data = await customer.adoptPet(id, pet_id)
        ctx.response.status = 200;
        ctx.body = { data }
    }
}

module.exports = CustomnerController;