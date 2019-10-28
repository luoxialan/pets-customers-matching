const joiRouter = require('koa-joi-router');
const Joi = joiRouter.Joi;
const router = joiRouter();

const petCtrl = require('./../controller').pet;
const customerCtrl = require('./../controller').customer;

// Pets
router.route({
    method: 'post',
    path: '/pets',
    validate: {
        type: 'json',
        body: Joi.object({
            name: Joi.string().required(),
            // available_from: Joi.string().optional(),
            age: Joi.number().integer().greater(-1).required(),
            species: Joi.string().valid('cat', 'dog', 'rabbit').required(),
            breed: Joi.string().valid('labrador', 'poodle', 'spaniel', 'terrier').optional(),
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.response.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await petCtrl.addPet(ctx);
        }
    }
})

router.route({
    method: 'get',
    path: '/pets/:id',
    validate: {
        params: Joi.object({
            id: Joi.number().integer().greater(0).optional()
        }).options({ abortEarly: false }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            console.log(JSON.stringify(ctx.invalid))
            ctx.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await petCtrl.getPetById(ctx);
        }
    }
})

router.route({
    method: 'get',
    path: '/pets/:id/matches',
    validate: {
        params: Joi.object({
            id: Joi.number().integer().greater(0).required()
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await petCtrl.getMatchedCustomer(ctx);
        }
    }
})

// Customers
router.route({
    method: 'post',
    path: '/customers',
    validate: {
        type: 'json',
        body: Joi.object({
            from: Joi.number().integer().greater(-1).optional(),
            to: Joi.number().integer().greater(0).optional(),
            species:  Joi.array().items(Joi.string().valid('cat', 'dog', 'rabbit').required()).optional(),
            breed: Joi.array().items(Joi.string().valid('labrador', 'poodle', 'spaniel', 'terrier').required()).optional()
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.response.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await customerCtrl.addCustomer(ctx);
        }
    }
})

router.route({
    method: 'get',
    path: '/customers/:id',
    validate: {
        params: Joi.object({
            id: Joi.number().integer().greater(0).required()
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await customerCtrl.getCustomerById(ctx);
        }
    }
})

router.route({
    method: 'get',
    path: '/customers/:id/matches',
    validate: {
        params: Joi.object({
            id: Joi.number().integer().greater(0).required()
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await customerCtrl.getMatchedPets(ctx);
        }
    }
})

router.route({
    method: 'post',
    path: '/customers/:id/adopt',
    validate: {
        params: Joi.object({
            id: Joi.number().integer().greater(0).required()
        }).options({ abortEarly: true }),
        query: Joi.object().optional().keys({
            pet_id: Joi.number().integer().greater(0).required(),
        }).options({ abortEarly: false }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            console.log(JSON.stringify(ctx.invalid))
            ctx.status = 400;
            const error = 'invalid.parameter';
            ctx.body = {
                error
            };
        } else {
            await customerCtrl.adoptPet(ctx);
        }
    }
})

module.exports = router;
