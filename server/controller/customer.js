const customer = require("../service").customer;

class CustomnerController {
    static async getCustomerById(ctx) {
        const { id } = ctx.params;
        const data = await customer.getCustomerById(id);
        let status_code = 1;
        if (typeof data === 'undefined') {
            status_code = 404;
            const message = 'not.found';
            return { status_code, data: message };
        }
        return { status_code, data };
        return data
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
        return data
    }

    static async getMatchedPets(ctx) {
        let { id } = ctx.params;
        let data = await customer.getMatchedPets(id)
        return data
    }

    static async adoptPet(ctx) {
        let { id } = ctx.params;
        let { pet_id } = ctx.query;
        let data = await customer.adoptPet(id, pet_id)
        return data
    }
}

module.exports = CustomnerController;