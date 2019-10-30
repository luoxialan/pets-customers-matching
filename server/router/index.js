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
            age: Joi.number().integer().greater(-1).required(),
            species: Joi.string().valid('cat', 'dog', 'rabbit').required(),
            breed: Joi.string().valid('labrador', 'poodle', 'spaniel', 'terrier').optional(),
        }).options({ abortEarly: true }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const data = await petCtrl.addPet(ctx);
            ctx.response.status = 200;
            ctx.body = {
                status_code: 1,
                data
            };
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
            ctx.status = 400;
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const{ status_code, data } = await petCtrl.getPetById(ctx);
            if (status_code == 1) {
                ctx.response.status = 200;
                ctx.body = {
                    status_code: 1,
                    data
                };
            } else {
                ctx.response.status = status_code;
                ctx.body = {
                    status_code: status_code,
                    message: data
                };
            }
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
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const data = await petCtrl.getMatchedCustomer(ctx);
            ctx.response.status = 200;
            ctx.body = {
                status_code: 1,
                data
            };
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
            ctx.status = 400;
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const data = await customerCtrl.addCustomer(ctx);
            ctx.response.status = 200;
            ctx.body = {
                status_code: 1,
                data
            };
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
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const{ status_code, data } = await customerCtrl.getCustomerById(ctx);
            if (status_code == 1) {
                ctx.response.status = 200;
                ctx.body = {
                    status_code: 1,
                    data
                };
            } else {
                ctx.response.status = status_code;
                ctx.body = {
                    status_code: status_code,
                    message: data
                };
            }
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
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const data = await customerCtrl.getMatchedPets(ctx);
            ctx.response.status = 200;
            ctx.body = {
                status_code: 1,
                data
            };
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
            ctx.status = 400;
            ctx.body = {
                status_code: 400,
                message: 'invalid.param',
                details: ctx.invalid.params.msg
            };
        } else {
            const data = await customerCtrl.adoptPet(ctx);
            ctx.response.status = 200;
            ctx.body = {
                status_code: 1,
                data
            };
        }
    }
})

module.exports = router;
