import * as _ from 'lodash';
import * as Sequelize from 'sequelize';

import { OrderService } from '../services/orders';
import { DeliveryOrderCompleteService } from '../services/DeliveryOrderComplete';
import { DeliveryOrderCompleteHelpers } from './helpers/DeliveryOrderComplete';
import { DeliveryOrderItemsService } from '../services/deliveryOrderItems';

import { DeliveryOrderCancelled } from '../models/DeliveryOrderCancelled';
import { SKU } from '../models/SKU';
import { SKUImage } from '../models/SKUImage';
import { User } from '../models/User';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { ChannelDefaultDelivery } from '../models/ChannelDefaultDelivery';
import { UserService } from '../services/user';
import { response } from 'express';

const orderService = new OrderService();
const deliveryOrderCompleteService = new DeliveryOrderCompleteService();
const deliveryOrderCompleteHelpers = new DeliveryOrderCompleteHelpers();
const userService = new UserService();
const deliveryOrderItemsService = new DeliveryOrderItemsService();

const Op = Sequelize.Op;

export const OrdersController = {
    getPendingOrders: async (req, res, next) => {

        const PAGE_SIZE = req.query.size != undefined ? Number(req.query.size) : 100;
        const isPaginated = req.query.page != undefined ? true : false;
        const coloumnSort = req.query.coloumn_sort != undefined ? req.query.coloumn_sort : 'created_datetime';
        const sortType = req.query.sort_type != undefined ? req.query.sort_type : 'ASC';
        if (!isPaginated) {
            const pendingorders = await orderService.getAllPendingOrders(coloumnSort, sortType);
            return res.json(pendingorders);
        } else {
            const offset = (Number(req.query.page) - 1) * PAGE_SIZE;
            const { count, rows } = await orderService.getAllPaginatedPendingOrders(offset, PAGE_SIZE, coloumnSort, sortType);
            return res.json({ totalCount: count, sales: rows });
        }
    },

    getCompletedOrders: async (req, res, next) => {
        const PAGE_SIZE = req.query.size != undefined ? Number(req.query.size) : 100;
        const isPaginated = req.query.page != undefined ? true : false;
        const coloumnSort = req.query.coloumn_sort != undefined ? req.query.coloumn_sort : 'created_datetime';
        let sortType = req.query.sort_type != undefined ? req.query.sort_type : '-1';
        if (sortType === 'DESC') {
            sortType = 1;
        }
        if (!isPaginated) {
            const completedOrders = await orderService.getAllCompletedOrders(coloumnSort, sortType);
            return res.json({ sales: completedOrders });
        } else {
            const offset = (Number(req.query.page) - 1) * PAGE_SIZE;
            try {
                const orders = await orderService.getPaginatedCompletedOrders(offset, PAGE_SIZE, coloumnSort, sortType);
                const count = await orderService.getCountOfAllCompletedOrders();
                return res.json({ totalCount: count, sales: orders });
            } catch (ex) {
                return next(ex);
            }
        }
    },

    getCancelledOrders: async (req, res, next) => {
        const PAGE_SIZE = req.query.size != undefined ? Number(req.query.size) : 100;
        const isPaginated = req.query.page != undefined ? true : false;
        const coloumnSort = req.query.coloumn_sort != undefined ? req.query.coloumn_sort : 'created_datetime';
        let sortType = req.query.sort_type != undefined ? req.query.sort_type : '-1';
        if (sortType === 'DESC') {
            sortType = 1;
        }
        if (!isPaginated) {
            const completedOrders = await orderService.getAllCancelledOrders(coloumnSort, sortType);
            return res.json({ sales: completedOrders });
        } else {
            const offset = (Number(req.query.page) - 1) * PAGE_SIZE;
            try {
                const orders = await orderService.getPaginatedCancelledOrders(offset, PAGE_SIZE, coloumnSort, sortType);
                const count = await orderService.getCountOfAllCancelledOrders();
                return res.json({ totalCount: count, sales: orders });
            } catch (ex) {
                return next(ex);
            }
        }
    },

    getBacklogOrders: async (req, res, next) => {

        const PAGE_SIZE = req.query.size != undefined ? Number(req.query.size) : 100;
        const isPaginated = req.query.page != undefined ? true : false;
        const coloumnSort = req.query.coloumn_sort != undefined ? req.query.coloumn_sort : 'created_at';
        const sortType = req.query.sort_type != undefined ? req.query.sort_type : 'ASC';
        if (!isPaginated) {
            const pendingorders = await orderService.getAllBackLogOrders(coloumnSort, sortType);
            return res.json(pendingorders);
        } else {
            const offset = (Number(req.query.page) - 1) * PAGE_SIZE;
            const { count, rows } = await orderService.getAllPaginatedBackLogOrders(offset, PAGE_SIZE, coloumnSort, sortType);
            return res.json({ totalCount: count, sales: rows });
        }
    },

    getOrderDetails: async (req, res, next) => {
        let responseData: any = {};
        const orderId = req.params.orderId;
        let cancelledOrder = await DeliveryOrderCancelled.findOne({ order_id: orderId });
        let cancelledItems = [];
        if (cancelledOrder) {
            cancelledOrder = cancelledOrder.toObject();
            for (const item of cancelledOrder.items) {
                const sku = await SKU.findOne({ sku_id: item.sku });
                cancelledItems.push({
                    sku_id: item.sku,
                    product_name: sku.product_name,
                    quantity: item.quantity,
                    selling_price: sku.selling_price,
                    legacy_code: sku.legacy_code
                });
            }
            responseData.cancelled_items = cancelledItems;
            cancelledOrder.items = cancelledItems;
        }
        const pendingOrder = await orderService.getPendingOrderDetalis(orderId);
        if (pendingOrder) {
            // DeliveryOrderItems has composite primary key. Hence we cannot
            // get delivery order items using "include" with DeliverOrderPending query.
            const deliveryOrderItems = await deliveryOrderItemsService.getOrderitems(orderId);
            responseData = { ...responseData, ...pendingOrder.dataValues };
            responseData.items = deliveryOrderItems;
            return res.json(responseData);
        }
        const completedOrder = await orderService.getCompletedOrderDetails(orderId);
        if (completedOrder) {
            let orderItems = [];
            const boxes = completedOrder.boxes;
            for (const box of boxes) {
                const trackingNum = box.awb;
                const items = box.items;
                for (const item of items) {
                    const skuImage = await SKUImage.findOne({ sku_id: item.sku_id });
                    orderItems.push({
                        sku_id: item.sku_id,
                        quantity: item.quantity,
                        preferred_bin_id: item.chosen_bin_id,
                        sku_image: skuImage.url,
                        awb: trackingNum,
                        ...item.sku._doc
                    });
                }
            }
            responseData = { ...responseData, ...completedOrder._doc };
            responseData.items = orderItems;
            responseData.delivery_method = boxes[0].delivery_method;
            delete responseData.plan;
            delete responseData._id;
            delete responseData.boxes;
            delete responseData.user_data.plan;
            return res.json(responseData);
        } else if (cancelledOrder) {
            const user = await userService.getUserById(cancelledOrder.user_id,
                ['first_name', 'last_name', 'email', 'user_role', 'billing_address', 'phone_number']);
            cancelledOrder.user = user;
            const defaultDeliveryMethod = await ChannelDefaultDelivery.findOne({
                where: {
                    [Op.and]: [
                        { user_id: cancelledOrder.user_id },
                        { channel_id: cancelledOrder.channel.channel_id }
                    ]
                },
                include: {
                    model: DeliveryMethod,
                    as: 'delivery_method'
                }
            });
            cancelledOrder.default_delivery_method = defaultDeliveryMethod || {};
            delete cancelledOrder._id;
            return res.json(cancelledOrder);
        }
        return res.status(404).send('ORDER NOT FOUND');
    },

    markOrderAsComplete: async (req, res, next) => {
        // TODO: Create Validator for below check
        //     api_key = request.headers.get('api-key')
        //      if api_key is None:
        //     return jsonify(error=True, response='Invalid API key'), 403
        let completeOrderJson = {};
        let awbNo = "";
        if (req.body.awb_no) {
            completeOrderJson = req.body;
            awbNo = completeOrderJson['awb_no'];
        }

        let closedState = 0;
        if (completeOrderJson["closed"]) {
            closedState = Number(completeOrderJson["closed"]);
        }
        const orderId = req.params.orderId;
        const pendingOrder = await deliveryOrderCompleteService.getPendingOrderByOrderId(orderId);
        if (!pendingOrder) {
            return res.status(404).send('Order ID Not Found')
        }
        let shippingCost = 0;
        let acutalSalesTotal = pendingOrder.sales_total;
        const merchantId = pendingOrder.user_id;
        let userData = JSON.parse(JSON.stringify(pendingOrder.user));
        userData.plan = [];
        let stripeId = userData.stripe_id;
        let userPlans = userData.user_plan;
        // sales total is plus shipping
        // 2 is qoo10 , 1 is lazada
        // sales total is plus shipping for qoo10 but need to recalculate the shipping cost
        if (pendingOrder.channel_id == 2) {
            // qoo10 resplit the shipping cost if combined order
            const noOfOrdersCombined = pendingOrder.channel_order_id.split(',').length;
            shippingCost = (pendingOrder.shipping_cost / noOfOrdersCombined);
        }
        else {
            shippingCost = pendingOrder.shipping_cost;
        }

        let deliveryOrder = {
            'user_id': pendingOrder.user_id,
            'channel_id': pendingOrder.channel_id,
            'created_datetime': pendingOrder.created_datetime,
            'delivery_datetime': pendingOrder.delivery_datetime,
            'delivery_period': pendingOrder.delivery_period,
            'method_id': pendingOrder.method_id,
            'order_num': pendingOrder.order_num,
            'recipient_name': pendingOrder.recipient_name,
            'recipient_email': pendingOrder.recipient_email,
            'address': pendingOrder.address,
            'postal_code': pendingOrder.postal_code,
            'payment_mode': pendingOrder.payment_mode,
            'discount_value': pendingOrder.discount_value,
            'coupon_value': pendingOrder.coupon_value,
            'shipping_cost': shippingCost,
            'handling_cost': pendingOrder.handling_cost,
            'contact_no': pendingOrder.contact_no,
            'inserted_datetime': pendingOrder.inserted_datetime,
            'gst': pendingOrder.gst,
            'special_request': pendingOrder.special_request,
            'channel_order_id': pendingOrder.channel_order_id,
            'order_counter': pendingOrder.order_counter,
            'sales_total': pendingOrder.sales_total,
            'country_code': pendingOrder.country_code,
            'city': pendingOrder.city,
            'state': pendingOrder.state,
            'address_type': pendingOrder.address_type,
            'tax_id': pendingOrder.tax_id,
            'currency': pendingOrder.currency,
            'exchange_rate': pendingOrder.exchange_rate
        }
        userPlans.forEach(UserPlan => {
            userData.plan.push({
                'plan_id': UserPlan.plan.plan_id,
                'plan_name': UserPlan.plan.plan_name,
                'bin_amount': UserPlan.plan.bin_amount,
                'price': UserPlan.plan.price,
                'per_delivery': UserPlan.plan.per_delivery,
                'per_delivery_item': UserPlan.plan.per_delivery_item,
                'delivery_item_threshold': UserPlan.plan.delivery_item_threshold
            });
        });
        delete userData.user_plan;

        const deliveryOrderItems = await deliveryOrderCompleteService.getDeliveryOrderItemByOrderId(orderId);
        const totalOrderSellingPrice = deliveryOrderCompleteHelpers.getTotalOrderSellingPriceByOrderId(deliveryOrderItems);
        let deliveryBoxes = [];
        let deliveryBox = {
            'awb': awbNo,
            'weight': 0,
            'box_length': 1,
            'box_width': 1,
            'box_height': 1,
            'delivery_method': pendingOrder.delivery_method,
            'items': []
        }
        let totalQuantity = 0
        // get selling price total as well
        let sellingPriceTotal = 0.00
        for (const deliveryOrderItem of deliveryOrderItems) {
            if (deliveryOrderItem.selling_price != null) {
                sellingPriceTotal = deliveryOrderItem.selling_price;
            }
            sellingPriceTotal = deliveryOrderItem.selling_price;
            let skuId = deliveryOrderItem.sku_id;
            let quantity = deliveryOrderItem.quantity;
            let preferredBin = deliveryOrderItem.preferred_bin_id;
            let pendingTableItemSellingPrice = null;
            if (deliveryOrderItem.selling_price != null) {
                pendingTableItemSellingPrice = deliveryOrderItem.selling_price;
                if (deliveryOrderItem.quantity != null && deliveryOrderItem.quantity > 0) {
                    pendingTableItemSellingPrice = (deliveryOrderItem.selling_price / deliveryOrderItem.quantity);
                }
            }
            let itemDiscountValue = deliveryOrderItem.discount_value;
            const ifLegacy = await deliveryOrderCompleteService.isLegacy(skuId, merchantId);
            if (ifLegacy) {
                skuId = ifLegacy.sku_id;
            }
            const skuInformation = await deliveryOrderCompleteService.getSkuBySkuId(skuId);
            let isKit = skuInformation.is_kit;
            if (isKit == 1) {
                // is kit so add kit item first and add child later
                // amortising of selling price and shipping cost
                let calSellingPrice = 0.0;
                let calShipping = 0.0;
                if (totalOrderSellingPrice != 0) {
                    calSellingPrice = skuInformation.selling_price == null ? 0 : (
                        (skuInformation.selling_price / totalOrderSellingPrice) * deliveryOrder.sales_total
                    );
                    calSellingPrice = parseFloat(calSellingPrice.toFixed(2))
                    calShipping = skuInformation.selling_price == null ? 0 : (
                        (skuInformation.selling_price / totalOrderSellingPrice) * deliveryOrder.shipping_cost
                    );
                    calShipping = parseFloat(calShipping.toFixed(2))
                }
                // get pending item table price if it is not zero then use that value
                if (pendingTableItemSellingPrice != null) {
                    calSellingPrice = pendingTableItemSellingPrice;
                }

                // combined shipping paid by customer to selling_price
                calSellingPrice += calShipping;
                // check if the kit parent has a channel
                // check if product has the channel

                let comissionRate = 0.0;
                const skuChannel = await deliveryOrderCompleteService.getSkuChannel(skuId, deliveryOrder.channel_id);
                if (skuChannel) {
                    comissionRate = skuChannel.commission_rate;
                }

                let boxItem = {
                    'sku_id': skuId,
                    'is_kit': 1,
                    'sku': {
                        'product_name': skuInformation.product_name,
                        'cost_price': skuInformation.cost_price == null ? 0 : skuInformation.cost_price,
                        'retail_price': skuInformation.retail_price == null ? 0 : skuInformation.retail_price,
                        'selling_price': calSellingPrice,
                        'item_length': skuInformation.item_length == null ? 0 : skuInformation.item_length,
                        'item_width': skuInformation.item_width == null ? 0 : skuInformation.item_width,
                        'item_height': skuInformation.item_height == null ? 0 : skuInformation.item_height,
                        'weight': skuInformation.weight == null ? 0 : skuInformation.weight,
                        'legacy_code': skuInformation.legacy_code,
                        'agreed_price': skuInformation.agreed_price == null || skuInformation.agreed_price == 0.00 ? calSellingPrice : skuInformation.agreed_price,
                        'item_brand': skuInformation.item_brand,
                        'seller_item_sku': skuInformation.seller_item_sku,
                        'seller_item_code': skuInformation.seller_item_code,
                        'category': skuInformation.category,
                        'consignment': skuInformation.consignment,
                        'unit_shipping': calShipping,
                        'channel': pendingOrder.channel.channel_id,
                        'commission_rate': comissionRate,
                        'vendor_id': skuInformation.vendor_id,
                        'item_type': skuInformation.item_type,
                        'origin_country': skuInformation.origin_country,
                        'hs_code': skuInformation.hs_code
                    },
                    'quantity': Number(quantity),
                    'chosen_bin_id': 'KIT'
                }
                deliveryBox.items.push(boxItem);
                // kit master no need add weight

                // get selling price of a kit base on child selling price * quantity
                const totalKitChildSellingPrice = deliveryOrderCompleteHelpers.getTotalKitChildSellingPrice(skuId);
                const kit = await deliveryOrderCompleteHelpers.kitSplit(skuId, quantity);
                for (const kitChild of kit) {
                    let kitChildSkuId = kitChild.sku;
                    let kitChildSkuQty = kitChild.qty;
                    const childSkuInformation = deliveryOrderCompleteService.getSkuBySkuId(kitChildSkuId);
                    let kitChildCalSellingPrice = 0;
                    let kitCalShipping = 0;
                    if (totalKitChildSellingPrice != 0) {
                        if (childSkuInformation.selling_price != null) {
                            kitChildCalSellingPrice = parseFloat(childSkuInformation.selling_price) / totalKitChildSellingPrice;
                            kitChildCalSellingPrice = kitChildCalSellingPrice * (calSellingPrice - calShipping);
                            kitChildCalSellingPrice = parseFloat(kitChildCalSellingPrice.toFixed(2))

                            kitCalShipping = parseFloat(childSkuInformation.selling_price) / totalKitChildSellingPrice;
                            kitCalShipping = kitCalShipping * calShipping;
                            kitCalShipping = parseFloat(kitCalShipping.toFixed(2))
                        }
                    } else {
                        kitChildCalSellingPrice = 0.00;
                        kitCalShipping = 0.00;
                    }
                    // combined shipping paid by customer to selling_price
                    kitChildCalSellingPrice = kitChildCalSellingPrice + kitCalShipping;

                    // check if the kit parent has a channel
                    // check if product has the channel

                    let kitChildComissionRate = 0.00;
                    const kitSkuChannel = await deliveryOrderCompleteService.getSkuChannel(kitChildSkuId, deliveryOrder.channel_id);
                    kitChildComissionRate = kitSkuChannel.commission_rate;

                    // check preferred bin
                    let preferredBin = "NA";
                    const stockage = await deliveryOrderCompleteService.getStockageForSku(kitChildSkuId, merchantId);
                    if (!stockage) {
                        // no bin exist so set to NA
                        preferredBin = stockage.bin_id;
                    }

                    // get weighted average cost
                    let weightedAverageCost = deliveryOrderCompleteHelpers.getAverageCost(deliveryOrder.created_datetime, skuId);


                    // TODO: Add weigh_average_cost
                    // TODO: Add parent_sku_id
                    boxItem = {
                        'sku_id': kitChildSkuId,
                        'is_kit': 0,
                        'sku': {
                            'product_name': childSkuInformation.product_name,
                            'cost_price': childSkuInformation.cost_price == null ? 0 : childSkuInformation.cost_price,
                            'retail_price': childSkuInformation.retail_price == null ? 0 : childSkuInformation.retail_price,
                            'selling_price': kitChildCalSellingPrice,
                            'item_length': childSkuInformation.item_length == null ? 0 : childSkuInformation.item_length,
                            'item_width': childSkuInformation.item_width == null ? 0 : childSkuInformation.item_width,
                            'item_height': childSkuInformation.item_height == null ? 0 : childSkuInformation.item_height,
                            'weight': childSkuInformation.weight == null ? 0 : childSkuInformation.weight,
                            'legacy_code': childSkuInformation.legacy_code,
                            'agreed_price': childSkuInformation.agreed_price == null || childSkuInformation.agreed_price == 0.00 ? kitChildCalSellingPrice : childSkuInformation.agreed_price,
                            'item_brand': childSkuInformation.item_brand,
                            'seller_item_sku': childSkuInformation.seller_item_sku,
                            'seller_item_code': childSkuInformation.seller_item_code,
                            'category': childSkuInformation.category,
                            'consignment': childSkuInformation.consignment,
                            'unit_shipping': childSkuInformation.unit_shipping,
                            'channel': pendingOrder.channel.channel_id,
                            'commission_rate': kitChildComissionRate,
                            'vendor_id': childSkuInformation.vendor_id,
                            'item_type': childSkuInformation.item_type,
                            'origin_country': childSkuInformation.origin_country,
                            'hs_code': childSkuInformation.hs_code,
                            // 'weighted_average_cost': weightedAverageCost
                        },
                        'quantity': kitChildSkuQty,
                        'chosen_bin_id': preferredBin
                    }
                    deliveryBox.items.push(boxItem);
                    // append total weight n qty
                    totalQuantity += kitChildSkuQty;
                    deliveryBox.weight = deliveryBox.weight + (boxItem.sku.weight * boxItem.quantity);
                }
            } else {
                // not a kit so just append to box
                let calSellingPrice = 0.0;
                let calShipping = 0.0;
                if (totalOrderSellingPrice != 0) {
                    calSellingPrice = skuInformation.selling_price == null ? 0 : (
                        (skuInformation.selling_price / totalOrderSellingPrice) * deliveryOrder.sales_total
                    );
                    calSellingPrice = parseFloat(calSellingPrice.toFixed(2))
                    calShipping = skuInformation.selling_price == null ? 0 : (
                        (skuInformation.selling_price / totalOrderSellingPrice) * deliveryOrder.shipping_cost
                    );
                    calShipping = parseFloat(calShipping.toFixed(2))
                }


                // get pending item table price if it is not zero then use that value
                if (pendingTableItemSellingPrice != null) {
                    calSellingPrice = pendingTableItemSellingPrice;
                }

                // combined shipping paid by customer to selling_price
                calSellingPrice += calShipping;

                // check if the kit parent has a channel
                // check if product has the channel
                let comissionRate = 0.0;
                const skuChannel = await deliveryOrderCompleteService.getSkuChannel(skuId, deliveryOrder.channel_id);
                if (skuChannel) {
                    comissionRate = skuChannel.commission_rate;
                }

                let weightedAverageCost = deliveryOrderCompleteHelpers.getAverageCost(deliveryOrder.created_datetime, skuId);

                let boxItem = {
                    'sku_id': skuId,
                    'is_kit': 0,
                    'sku': {
                        'product_name': skuInformation.product_name,
                        'cost_price': skuInformation.cost_price == null ? 0 : skuInformation.cost_price,
                        'retail_price': skuInformation.retail_price == null ? 0 : skuInformation.retail_price,
                        'selling_price': calSellingPrice,
                        'item_length': skuInformation.item_length == null ? 0 : skuInformation.item_length,
                        'item_width': skuInformation.item_width == null ? 0 : skuInformation.item_width,
                        'item_height': skuInformation.item_height == null ? 0 : skuInformation.item_height,
                        'weight': skuInformation.weight == null ? 0 : skuInformation.weight,
                        'legacy_code': skuInformation.legacy_code,
                        'agreed_price': skuInformation.agreed_price == null || skuInformation.agreed_price == 0.00 ? calSellingPrice : skuInformation.agreed_price,
                        'item_brand': skuInformation.item_brand,
                        'seller_item_sku': skuInformation.seller_item_sku,
                        'seller_item_code': skuInformation.seller_item_code,
                        'category': skuInformation.category,
                        'consignment': skuInformation.consignment,
                        'unit_shipping': calShipping,
                        'channel': pendingOrder.channel.channel_id,
                        'commission_rate': comissionRate,
                        'weighted_average_cost': await weightedAverageCost,
                        'vendor_id': skuInformation.vendor_id,
                        'item_type': skuInformation.item_type,
                        'origin_country': skuInformation.origin_country,
                        'hs_code': skuInformation.hs_code
                    },
                    'quantity': Number(quantity),
                    'chosen_bin_id': preferredBin
                }
                deliveryBox.items.push(boxItem);
                totalQuantity += Number(quantity)
                deliveryBox.weight = deliveryBox.weight + (boxItem.sku.weight * boxItem.quantity);

            }

            deliveryBox.weight += 0.5;
            deliveryBoxes.push(deliveryBox);
            let timeStamp = Date.now();
            // Order total and delivery cost calculation here
            // charge merchant
            // per delivery + (quantity * per_delivery_item) + value added services + box weight
            // get weight price
            let deliveryWeightPrice = 0;
            for (const box of deliveryBoxes) {
                for (const range of pendingOrder.delivery_method.delivery_weight_range) {
                    if (box.weight < range.upper_bound && box.weight >= range.lower_bound) {
                        deliveryWeightPrice += range.price;
                        break;
                    }
                }
            }

            let divisorWeightPrice = 0;
            for (const box of deliveryBoxes) {
                divisorWeightPrice += (box.box_length * box.box_width * box.box_height / pendingOrder.delivery_method.divisor)
            }

            // no need volumn price for this
            // if divisor_weight_price > delivery_weight_price:
            // delivery_weight_price = divisor_weight_price

            // import and api complete no need value added services

            // Pick & Pack = $1.7/order, max 3 pdts. $0.5 per additional pdt
            let valueAddedCost = 0;
            totalQuantity = totalQuantity - userData.plan[0].delivery_item_threshold;
            totalQuantity = totalQuantity < 0 ? 0 : totalQuantity;
            let totalPrice = ((userData.plan[0].per_delivery * deliveryBoxes.length) + (
                totalQuantity * userData.plan[0].per_delivery_item) + valueAddedCost);
            let deliveryCost = deliveryWeightPrice + (deliveryBoxes.length * pendingOrder.delivery_method.flat_fee)
            if (sellingPriceTotal <= 0) {
                sellingPriceTotal = deliveryOrder.sales_total;
            }

            // shipping included in sales total list of channel id
            let shippingIncludedList = [50]  // currently only Zalora

            // sales total
            let salesTotal = 0;
            if (shippingIncludedList.includes(pendingOrder.channel.channel_id)) {
                salesTotal = deliveryOrder.sales_total;
            } else {
                salesTotal = deliveryOrder.sales_total + deliveryOrder.shipping_cost;
            }

            let deliveryOrderComplete = {
                'delivery_datetime': deliveryOrder.delivery_datetime,
                'gst': deliveryOrder.gst,
                'order_total': totalPrice,
                'order_id': orderId,
                'order_counter': deliveryOrder.order_counter,
                'value_added_services': [],
                'sales_total': salesTotal,
                'user_id': deliveryOrder.user_id,
                'order_num': deliveryOrder.order_num,
                'payment_mode': deliveryOrder.payment_mode,
                'discount_value': deliveryOrder.discount_value,
                'shipping_cost': deliveryOrder.shipping_cost,
                'completed_datetime': timeStamp,
                'delivery_cost': deliveryCost,
                'recipient_name': deliveryOrder.recipient_name,
                'status': 'Completed',
                'address': deliveryOrder.address,
                'postal_code': deliveryOrder.postal_code,
                'handling_cost': deliveryOrder.handling_cost,
                'delivery_period': deliveryOrder.delivery_period,
                'box_count': deliveryBoxes.length,
                'special_request': deliveryOrder.special_request,
                'recipient_email': deliveryOrder.recipient_email,
                'channel_order_id': deliveryOrder.channel_order_id,
                'coupon_value': deliveryOrder.coupon_value,
                'user_data': userData,
                'boxes': deliveryBoxes,
                'channel': pendingOrder.channel,
                'delivery_status': { 'closed': closedState, 'status': 'Ready To Ship', 'updated_at': timeStamp },
                'contact_no': deliveryOrder.contact_no,
                'created_datetime': deliveryOrder.created_datetime,
                'inserted_datetime': deliveryOrder.inserted_datetime,
                'selling_price_total': sellingPriceTotal + deliveryOrder.shipping_cost,
                'country_code': deliveryOrder.country_code,
                'city': deliveryOrder.city,
                'state': deliveryOrder.state,
                'address_type': deliveryOrder.address_type,
                'tax_id': deliveryOrder.tax_id,
                'currency': deliveryOrder.currency,
                'exchange_rate': deliveryOrder.exchange_rate
            }

            let jsonOrderCompleteData = JSON.stringify(deliveryOrderComplete);
            let loadedJSONOrderCompleteData = JSON.parse(jsonOrderCompleteData);
            let result = await deliveryOrderCompleteService.addNewDeliveryOrderComplete(loadedJSONOrderCompleteData);
            console.log(result);

            // TODO: Add Logging here
            const deletedDeliveryItem = await deliveryOrderCompleteService.deleteDeliveryItemFromTableByOrderId(orderId);
            const deletedPendingOrder = await deliveryOrderCompleteService.deletePendingOrderFromTableByOrderId(orderId);

            // start of chargify for delivery order
            // check the count of the box and items in replicated code as well and charge accordingly
            // charge per pick pack item
            // insert_chargify_billable(cur,"Outbound Processing - Pick & Pack Item",order_id,total_quantity,deliveryordercomplete['user_id'])
            // charge per box
            // insert_chargify_billable(cur,"Outbound Processing - Packaging Box",order_id,deliveryordercomplete['box_count'],deliveryordercomplete['user_id'])
            // charge per order

            deliveryOrderCompleteHelpers.insertChargifyBillable("Platform Fees - Orders", orderId, 1, deliveryOrderComplete.user_id);
            deliveryOrderCompleteHelpers.insertChargifyBillable("Big Data Analytics", orderId, 1, deliveryOrderComplete.user_id);

            let deliveryCostCoponentName = "";
            let totalWeight = 0.00;
            deliveryBoxes.forEach(box => {
                totalWeight += box.weight;
            })

            let totalAmount = deliveryOrderComplete.order_total + deliveryOrderComplete.delivery_cost;

            const chargeDescription = "Delivery Order " + deliveryOrderComplete.order_id + ". $" +
                String(userData.plan[0].per_delivery_item * totalQuantity) + "/Pick pack " +
                String(totalQuantity) + " item(s). $" +
                String(userData.plan[0].per_delivery * deliveryOrderComplete.box_count) + "/Packaging " +
                String(deliveryOrderComplete.box_count) + " box(s). $" +
                String(deliveryOrderComplete.delivery_cost) + "/Delivery Cost " +
                String(totalWeight) + "KG(s)";

            deliveryOrderCompleteHelpers.insertChargifyBillable("immediate", chargeDescription, totalAmount, deliveryOrderComplete.user_id);

            // end of chargify for delivery order

            // replicant code here
            // replicant_dict { user_id : replicated_order}
            // for each box
            //     for each line item
            //         check if sku is replicated for merchant
            //         get replicant merchant id
            //         check if replicant_list has merchant
            //         if exist:
            //             append
            //         else:
            //             add to box

            let replicantDict = new Object();
            for (const box of deliveryBoxes) {
                for (const item of box.items) {
                    // logged deducted qty if it is not kit
                    if (item.is_kit == 0) {
                        // check if it is back order meaning no stockage exist
                        if (item.chosen_bin_id != "NA") {
                            // try update fail also nvm since we are syncing from skuvault
                            const updatedStockage = await deliveryOrderCompleteService.updateStockageByBinIdAndSkuId(
                                item.quantity, item.chosen_bin_id, item.sku_id);
                            const stockageQuantity = await deliveryOrderCompleteService.getStockageByBinIdAndSkuId(item.chosen_bin_id, item.sku_id);
                            let binQuantity = 0;
                            if (stockageQuantity) {
                                binQuantity = stockageQuantity.quantity;
                            }
                            // TODO: Update mongodb logs here
                        }

                        const updatedSku = await deliveryOrderCompleteService.updateSkuUpdatedAtBySkuId(timeStamp, item.sku_id);

                        // TODO: update mongodb logs here

                        // end of deducted log

                        const userIdFromReplicateSku = await deliveryOrderCompleteService.getUserIdFromReplicateSku(item.sku_id);
                        if (userIdFromReplicateSku) {
                            for (const userId of userIdFromReplicateSku) {
                                if (replicantDict && userId.user_id in replicantDict) {
                                    // check if box exists in replicant object
                                    // created a set with all the awb values inside
                                    let awbSet = new Set();
                                    for (const b of replicantDict[userId.user_id].boxes) {
                                        awbSet.add(b.awd)
                                    }
                                    if (awbSet.has(box.awb)) {
                                        // box exists, add item in
                                        for (const b of replicantDict[userId.user_id].boxes) {
                                            if (item.is_kit == 0) {
                                                b.weight = b.weight + (item.sku.weight * item.quantity);
                                            }
                                            if (b.awb == box.awb) {
                                                b.items.push(item)
                                            }
                                        }
                                    } else {
                                        // box doesn't exist, add box with item in
                                        replicantDict[userId.user_id]['boxes'].push(
                                            {
                                                'awb': box.awb,
                                                'weight': item.is_kit == 0 ? (item.sku.weight * item.quantity) : 0.000,
                                                'box_length': box.box_length,
                                                'box_width': box.box_width,
                                                'box_height': box.box_height,
                                                'delivery_method': box.delivery_method,
                                                'items': [item,]
                                            }
                                        )
                                    }
                                    // recalculate price total only for non kit
                                    if (!item.is_kit) {
                                        replicantDict[userId.user_id].price_total += (item.sku.selling_price * item.quantity);
                                        replicantDict[userId.user_id].shipping_cost += (item.sku.unit_shipping * item.quantity);
                                    }
                                } else {
                                    // create new replicant object
                                    let shippingCostReplicant = 0.0;
                                    let priceTotalReplicant = 0.0;
                                    if (!item.is_kit) {
                                        shippingCostReplicant = item.sku.unit_shipping * item.quantity;
                                        priceTotalReplicant = item.sku.selling_price * item.quantity
                                    }
                                    shippingCostReplicant = parseFloat(shippingCostReplicant.toFixed(2));
                                    priceTotalReplicant = parseFloat(priceTotalReplicant.toFixed(2));
                                    replicantDict[userId.user_id] = {
                                        'order_id': deliveryOrderComplete.order_id,
                                        'order_owner_id': deliveryOrderComplete.user_id,
                                        'order_owner_name': deliveryOrderComplete.user_data.company,
                                        'replicant_id': userId.user_id,
                                        'status': 'Completed',
                                        'created_datetime': deliveryOrderComplete.created_datetime,
                                        'completed_datetime': deliveryOrderComplete.completed_datetime,
                                        'delivery_datetime': deliveryOrderComplete.delivery_datetime,
                                        'delivery_period': deliveryOrderComplete.delivery_period,
                                        'channel': deliveryOrderComplete.channel,
                                        'recipient_name': deliveryOrderComplete.recipient_name,
                                        'recipient_email': deliveryOrderComplete.recipient_email,
                                        'address': deliveryOrderComplete.address,
                                        'special_request': deliveryOrderComplete.special_request,
                                        'postal_code': deliveryOrderComplete.postal_code,
                                        'payment_mode': deliveryOrderComplete.payment_mode,
                                        'shipping_cost': shippingCostReplicant,
                                        'price_total': priceTotalReplicant,
                                        'order_num': deliveryOrderComplete.order_num,
                                        'delivery_status': {
                                            'closed': 0, 'status': 'Ready To Ship',
                                            'updated_at': timeStamp
                                        },
                                        'boxes': [
                                            {
                                                'awb': box.awb,
                                                'weight': item.is_kit == 0 ? (item.sku.weight * item.quantity) : 0.000,
                                                'box_length': box.box_length,
                                                'box_width': box.box_width,
                                                'box_height': box.box_height,
                                                'delivery_method': box.delivery_method,
                                                'items': [item,]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                        // insert replicated orders if replicants exists

                        const replicantKeysCount = Object.keys(replicantDict).length;
                        if (replicantKeysCount > 0) {
                            for (const replicantId of Object.keys(replicantDict)) {
                                // insert replicated order into mongodb collection ReplicatedSKUOrders
                                // collection has a unique index over {order_id:1,replicant_id:1}
                                // if two replicated orders have the same order_id and replicant_id
                                // mongodb will throw a duplicate document error
                                // get total weight for order

                                let totalWeightOfOrder = 0.00;
                                deliveryBoxes.forEach(eachBox => {
                                    totalWeightOfOrder += eachBox.weight;
                                })
                                let replicatedTotalWeight = 0.00;
                                replicantDict[replicantId].boxes.forEach(eachBox => {
                                    replicatedTotalWeight += eachBox.weight;
                                })
                                // update delivery cost of replicated order
                                if (totalWeightOfOrder != 0) {
                                    let temp = (deliveryOrderComplete.delivery_cost *
                                        (replicatedTotalWeight / totalWeightOfOrder))
                                    replicantDict[replicantId].delivery_cost = parseFloat(temp.toFixed(2));
                                }
                                else {
                                    let temp = deliveryOrderComplete.delivery_cost;
                                    replicantDict[replicantId].delivery_cost = parseFloat(temp.toFixed(2));
                                    // TODO: Please look into below query
                                    // db.ReplicatedSKUOrders.insert_one(replicant_dict[replicant_id])
                                }
                            }
                        }
                    }
                }
            }
        }
        return res.json({
            status: 'ok',
            response: 'Order was succesfully Completed'
        }).status(200);
    }
};
