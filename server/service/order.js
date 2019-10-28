const order = require("../model").order;
const DistanceMatrix = require("../lib").dist;

async function getOrders(page, limit) {
    let data = await order.getOrders(page, limit)
    return data
}

async function createOrder(origin, destination) {
    const dist = await DistanceMatrix.getDistanceMatrix(origin, destination);
    if(typeof dist.error !== 'undefined') {
        const data = {
            error: "Invalid Request"
        }
        return data
    } else {
        const orderItem = {
            start_latitude: origin[0],
            start_longtitude: origin[1],
            end_latitude: destination[0],
            end_longtitude: destination[1],
            distance: dist
        }
        const data = await order.createOrder(orderItem)
        return data
    }

}

async function takeOrder(id) {
    const data = await order.takeOrder(id)
    return data
}

module.exports = {
    createOrder,
    getOrders,
    takeOrder
};
