import { DeliveryOrderPending } from '../models/DeliveryOrderPending';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { DeliveryWeightRange } from '../models/DeliveryWeightRange';
import { Channel } from '../models/Channel';
import { DeliveryOrderCompleted } from '../models/DeliveryOrderCompleted';
import { DeliveryOrderCancelled } from '../models/DeliveryOrderCancelled';
import { OrderBackLog } from '../models/OrderBackLog';
import * as sequelize from 'sequelize';
const Ne = sequelize.Op.ne;

const PENDING_ORDER_ATTRIBUTES: string[] = [
    'address',
    'channel_id',
    'channel_order_id',
    'completed_datetime',
    'coupon_value',
    'created_datetime',
    'delivery_datetime',
    'delivery_period',
    'discount_value',
    'gst',
    'handling_cost',
    'method_id',
    'order_id',
    'order_num',
    'payment_mode',
    'postal_code',
    'recipient_email',
    'recipient_name',
    'sales_total',
    'shipping_cost',
    'special_request',
    'status',
    'user_id',
];

const COMPLETED_ORDER_ATTRIBUTES = {
    '_id': 0,
    'channel.name': 1,
    'sales_total': 1,
    'order_num': 1,
    'delivery_status.status': 1,
    'boxes.awb': 1,
    'user_id': 1,
    'order_id': 1,
    'created_datetime': 1,
    'completed_datetime': 1,
    'recipient_name': 1,
    'boxes.delivery_method.delivery_code': 1
};
const CANCELLED_ORDER_ATTRIBUTES = {
    '_id': 0,
    'channel.channel_id': 0,
    'items.legacy_code': 0,
    'type': 0
};
const REQUIRED_BACKLOG_ORDER_ATTRIBUTES: string[] = [
    'id',
    'order_num',
    'details',
    'user_id',
    'created_at',
    'reason'
];


const DEFAULT_DATA_LIMIT = 100;

export class OrderService {

    private static get orderAttributes() {
        return ['order_id', 'user_id', 'recipent_name'];
    }
    private static _order;
    private static get order() {
        return OrderService._order;
    }

    public getOrderByOrderId(id: string): Promise<any> {
        return DeliveryOrderPending.findOne({ attributes: ['order_id', 'user_id'], where: { order_id: id } });
    }

    public getAllPendingOrders(columnSort: string, sortType: string) {
        return DeliveryOrderPending.findAll({
            attributes: PENDING_ORDER_ATTRIBUTES, include: [
                { model: DeliveryMethod, as: 'delivery_method', attributes: ['delivery_code'] },
                { model: Channel, as: 'channel', attributes: ['channel_id', 'name'] }],
            order: [[columnSort, sortType]]
        });
    }

    public getPendingOrderDetalis(orderId) {
        return DeliveryOrderPending.findOne({
            where: { order_id: orderId },
            attributes: PENDING_ORDER_ATTRIBUTES,
            include: [
                {
                    model: DeliveryMethod,
                    as: 'delivery_method',
                    attributes: [
                        'method_id',
                        'delivery_code',
                        'delivery_name',
                        'flat_fee',
                    ],
                    include: {
                        model: DeliveryWeightRange,
                        as: 'delivery_weight_range',
                    }
                }
            ]
        });
    }

    public getAllPaginatedPendingOrders(offset: number, limit: number, columnSort: string, sortType: string) {
        return DeliveryOrderPending.findAndCountAll({
            attributes: PENDING_ORDER_ATTRIBUTES, include: [
                { model: DeliveryMethod, as: 'delivery_method', attributes: ['delivery_code'] },
                { model: Channel, as: 'channel', attributes: ['channel_id', 'name'] }],
            order: [[columnSort, sortType]],
            offset: offset,
            limit: limit
        });
    }

    public getAllCompletedOrders(coloumnSort: string, sortType: number) {
        return DeliveryOrderCompleted.find({}, COMPLETED_ORDER_ATTRIBUTES)
            .sort({ [coloumnSort]: sortType })
            .limit(DEFAULT_DATA_LIMIT);
    }

    public getPaginatedCompletedOrders(offset: number, limit: number, coloumnSort: string, sortType: string) {
        return DeliveryOrderCompleted.find({}, COMPLETED_ORDER_ATTRIBUTES, { 'limit': limit, 'skip': offset })
            .sort({ [coloumnSort]: sortType });
    }

    public getCountOfAllCompletedOrders() {
        return DeliveryOrderCompleted.countDocuments();
    }

    public getCompletedOrderDetails(orderId) {
        return DeliveryOrderCompleted.findOne({ order_id: orderId });
    }

    public getAllCancelledOrders(coloumnSort: string, sortType: number) {
        return DeliveryOrderCancelled.find({}, CANCELLED_ORDER_ATTRIBUTES)
            .sort({ [coloumnSort]: sortType })
            .limit(DEFAULT_DATA_LIMIT);
    }

    public getPaginatedCancelledOrders(offset: number, limit: number, coloumnSort: string, sortType: string) {
        return DeliveryOrderCancelled.find({}, CANCELLED_ORDER_ATTRIBUTES, { 'limit': limit, 'skip': offset })
            .sort({ [coloumnSort]: sortType });
    }

    public getCountOfAllCancelledOrders() {
        return DeliveryOrderCancelled.countDocuments();
    }

    public getAllBackLogOrders(columnSort: string, sortType: string) {
        return OrderBackLog.findAll({
            attributes: REQUIRED_BACKLOG_ORDER_ATTRIBUTES, include: [
                { model: Channel, as: 'channel', attributes: ['channel_id', 'name'] }],
            order: [[columnSort, sortType]]
        });
    }

    public getAllPaginatedBackLogOrders(offset: number, limit: number, columnSort: string, sortType: string) {
        let orderClause = null;
        switch (columnSort) {

        case 'channel':
            orderClause = [[{ model: Channel, as: 'channel' }, 'name', sortType]];
            break;
        default:
            orderClause = [[columnSort, sortType]];
            break;
        }
        return OrderBackLog.findAndCountAll({
            attributes: REQUIRED_BACKLOG_ORDER_ATTRIBUTES, include: [
                { model: Channel, as: 'channel', attributes: ['channel_id', 'name'] }],
            order: orderClause,
            offset: offset,
            limit: limit
        });
    }

}
