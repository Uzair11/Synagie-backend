import { DeliveryOrderPending } from '../models/DeliveryOrderPending'
import { Channel } from '../models/Channel';
import { User } from '../models/User';
import * as sequelize from 'sequelize';
import { UserPlan } from '../models/UserPlan';
import { Plan } from '../models/Plan';
import { DeliveryOrderItems } from '../models/DeliveryOrderItems';
import { SKU } from '../models/SKU';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { DeliveryWeightRange } from '../models/DeliveryWeightRange';
import { SKUChannel } from '../models/SKUChannel';
import { SKUKit } from '../models/SKUKit';
import { Stockage } from '../models/Stockage';
import { SKUAverageCost } from '../models/SKUAverageCost';
import { DeliveryOrderCompleted } from '../models/DeliveryOrderCompleted';
import { ChargifyComponentId } from '../models/ChargifyComponentId';
import { ChargifyBillable } from '../models/ChargifyBillable';
import { ReplicateSKU } from '../models/ReplicateSKU';
import { Sequelize } from 'sequelize';
const NE = sequelize.Op.ne;
const LT = sequelize.Op.lt;

export class DeliveryOrderCompleteService {
    getPendingOrderByOrderId(id: string) {
        return DeliveryOrderPending.findOne({
            where: { order_id: id },
            include: [
                {
                    model: Channel,
                    as: 'channel',
                    attributes: [
                        'channel_id',
                        'name'
                    ],
                }, {
                    model: User,
                    as: 'user',
                    attributes: [
                        'email',
                        'first_name',
                        'last_name',
                        'created_datetime',
                        'company',
                        'billing_address',
                        'postal_code',
                        'phone_number',
                        'stripe_id'
                    ],
                    include: [
                        {
                            model: UserPlan,
                            as: 'user_plan',
                            attributes: [
                                'user_id',
                                'plan_id'
                            ],
                            include: [
                                {
                                    model: Plan,
                                    as: 'plan',
                                    attributes: [
                                        'plan_id',
                                        'plan_name',
                                        'bin_amount',
                                        'price',
                                        'per_delivery',
                                        'per_delivery_item',
                                        'delivery_item_threshold'
                                    ]
                                }
                            ]
                        }
                    ]
                }, {
                    model: DeliveryMethod,
                    as: 'delivery_method',
                    attributes: [
                        'delivery_code',
                        'delivery_name',
                        'flat_fee',
                        'divisor'
                    ],
                    include: [
                        {
                            model: DeliveryWeightRange,
                            as: 'delivery_weight_range',
                            attributes: [
                                'lower_bound',
                                'upper_bound',
                                'price'
                            ]
                        }
                    ]
                }
            ]
        });
    }

    getDeliveryOrderItemByOrderId(id: string) {
        return DeliveryOrderItems.findAll({
            where: { order_id: id },
            attributes: [
                'sku_id',
                'quantity',
                'preferred_bin_id',
                'selling_price',
                'discount_value'
            ],
            include: [
                {
                    model: SKU,
                    as: 'sku',
                    attributes: [
                        'selling_price',
                        'is_kit'
                    ]
                }
            ]
        })
    }

    isLegacy(sku_id: string, user_id: string) {
        return SKU.findOne({
            where: { sku_id: sku_id, user_id: user_id },
            attributes: [
                'sku_id'
            ]
        })
    }

    getSkuBySkuId(sku_id: string) {
        return SKU.findOne({
            where: { sku_id: sku_id },
            attributes: [
                'product_name',
                'cost_price',
                'retail_price',
                'selling_price',
                'item_length',
                'item_width',
                'item_height',
                'weight',
                'legacy_code',
                'is_kit',
                'agreed_price',
                'item_brand',
                'seller_item_sku',
                'seller_item_code',
                'category',
                'consignment',
                'category',
                'vendor_id',
                'item_type',
                'origin_country',
                'hs_code'
            ]
        })
    }

    getSkuChannel(sku_id: string, channel_id: string) {
        return SKUChannel.findOne({
            where: { sku_id: sku_id, channel_id: channel_id },
            attributes: [
                'commission_rate'
            ]
        })
    }

    getSkuKitBySkuId(sku_id: string) {
        return SKUKit.findAll({
            where: { sku_id: sku_id },
            attributes: [
                'child_sku_id',
                'quantity'
            ]
        })
    }

    getStockageForSku(sku_id: string, merchant_id: string) {
        return Stockage.findOne({
            where: { sku_id: sku_id, user_id: merchant_id },
            attributes: [
                'bin_id'
            ],
            order: [['priority', 'ASC']]
        })
    }

    getSkuAverageCostBySkuId(sku_id: string, created_datetime: Date) {
        return SKUAverageCost.findOne({
            attributes: [
                'current_cost'
            ],
            where: {
                sku_id: sku_id,
                updated_datetime: {
                    LT: created_datetime
                }
            },
            order: [['updated_datetime', 'DESC']]
        })
    }

    addNewDeliveryOrderComplete(deliveryOrderCompleteData: object) {
        return DeliveryOrderCompleted.create(deliveryOrderCompleteData);
    }

    deletePendingOrderFromTableByOrderId(orderId: string) {
        return DeliveryOrderPending.destroy({
            where: {
                order_id: orderId
            }
        });
    }

    deleteDeliveryItemFromTableByOrderId(orderId: string) {
        return DeliveryOrderItems.destroy({
            where: {
                order_id: orderId
            }
        });
    }

    getUserPlanByUserIdAndPlanId(userId: string, planId: string) {
        return UserPlan.findOne({
            where: {
                user_id: userId,
                plan_id: planId
            }
        })
    }

    getUserBigDataStatusByUserId(userId: string) {
        return User.findOne({
            where: {
                user_id: userId
            },
            attributes: [
                'big_data_status'
            ]
        });
    }

    getChargifyComponentIdByComponentName(componentName: string) {
        return ChargifyComponentId.findOne({
            where: {
                name: componentName
            },
            attributes: [
                'id'
            ]
        })
    }

    addChargifyBillable(componentId: string, description: string, qty: number, userId: string, status: string) {
        return ChargifyBillable.create({ componentId, description, qty, userId, status }, {
            fields: ['component_id', 'description', 'qty', 'user_id', 'status']
        })
    }

    updateStockageByBinIdAndSkuId(qty: number, binId: string, skuId: string) {
        return Stockage.update(
            {
                quantity: Sequelize.literal(`quantity - ${qty}`)
            },
            {
                where: {
                    bin_id: binId,
                    sku_id: skuId
                }
            }
        )
    }

    getStockageByBinIdAndSkuId(binId: string, skuId: string) {
        return Stockage.findOne({
            where: {
                bin_id: binId,
                sku_id: skuId
            },
            attributes: [
                'quantity'
            ]
        })
    }

    updateSkuUpdatedAtBySkuId(timestamp: Number, skuId: string) {
        console.log(skuId);
        return SKU.update({
            updated_at: timestamp
        }, {
                where: {
                    sku_id: skuId
                }
            })
    }

    getUserIdFromReplicateSku(skuId: string) {
        return ReplicateSKU.findAll({
            where: {
                sku_id: skuId
            },
            attributes: [
                'user_id'
            ]
        })
    }
}