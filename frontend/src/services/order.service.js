import { httpService } from './http.service.js';
const ENDPOINT = 'order'


export const orderService = {
    query,
    getById,
    remove,
    getOrders,
    saveOrder,
    updateOrder,
}

const allTags = [
    'logo-design',
    'wordpress',
    'voice-over',
    'artisitic',
    'proffesional',
    'accessible',
]


async function query(filterBy) {
    const orders = await httpService.get(ENDPOINT, filterBy)
    const sortedAsc = orders.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt),
    )
    const sortedDesc = orders.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
    )
    return orders
}

async function getOrders(filterBy) {
    return Promise.resolve(orderData)
}

async function getById(id) {
    return await httpService.get(`${ENDPOINT}/${id}`)
}

async function remove(id) {
    return await httpService.delete(`${ENDPOINT}/${id}`)
}

function updateOrder(order, response) {
    const savedOrder = { ...order }
    savedOrder.status = response
    return _save(savedOrder)
}

function saveOrder(order, user) {
    const savedOrder = {
        buyer: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            level: user.level,
        },
        seller: {
            _id: order.owner._id,
            fullname: order.owner.fullname,
            imgUrl: order.owner.imgUrl,
            level: order.owner.level,
            rate: order.owner.level,
        },
        gig: {
            _id: order._id,
            title: order.title,
            imgUrl: order.imgUrl,
            price: order.price
        },
        status: 'pending',
        createdAt: datetime
    }
    _save(savedOrder)
    return savedOrder
}
async function _save(savedOrder) {
    return savedOrder._id
        ? await httpService.put(`${ENDPOINT}/${savedOrder._id}`, savedOrder)
        : await httpService.post(ENDPOINT, savedOrder)
}

var currentdate = new Date();
var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();


function isPrimaryTag(tag) {
    return allTags.slice(0, 3).includes(tag)
}

