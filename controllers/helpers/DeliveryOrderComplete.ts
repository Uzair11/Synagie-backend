import { DeliveryOrderCompleteService } from '../../services/DeliveryOrderComplete';
import * as sequelize from '../../db/db';

const deliveryOrderCompleteService = new DeliveryOrderCompleteService();

export class DeliveryOrderCompleteHelpers {
    public getTotalOrderSellingPriceByOrderId(deliveryOrderItems: any) {
        let totalOrderSellingPrice = 0.0;
        deliveryOrderItems.forEach(deliveryOrderItem => {
            let indivSellingPrice = deliveryOrderItem.sku.selling_price;
            let itemSellingPrice = 0.0;
            if (indivSellingPrice) {
                itemSellingPrice = indivSellingPrice;
            }
            totalOrderSellingPrice = totalOrderSellingPrice + (itemSellingPrice * Number(deliveryOrderItem.quantity));
        });
        return totalOrderSellingPrice;
    }

    public getTotalKitChildSellingPrice(skuId: string) {
        // const skuKit = await deliveryOrderCompleteService.getSkuKitBySkuId(skuInformation.sku_id);
        // skuKit.forEach(skuKit => {

        // })
        let totalKitChildSellingPrice = 0.00;
        sequelize.query(`SELECT (SKU.selling_price*SKUKit.quantity) FROM SKUKit,SKU WHERE SKUKit.sku_id = '${skuId}' AND SKU.sku_id = SKUKit.child_sku_id`).then(price => {
            totalKitChildSellingPrice += price;
        });
        return totalKitChildSellingPrice;
    }

    public kitSplit(kit_id: string, qty: string) {
        return deliveryOrderCompleteService.getSkuKitBySkuId(kit_id).then(skuKits => {
            if (skuKits) {
                let splittedItems = [];
                let childSku;
                let childQty;
                skuKits.forEach(skuKit => {
                    childSku = skuKit.child_sku_id;
                    childQty = Number(skuKit.quantity);
                    splittedItems.push({ 'sku': childSku, 'qty': childQty });
                });
                return splittedItems;
            } else {
                return [{ 'sku': kit_id, 'qty': qty }];
            }
        });
    }

    public async getAverageCost(created_at: Date, skuId: string) {
        const currentCost = await deliveryOrderCompleteService.getSkuAverageCostBySkuId(skuId, created_at);
        if (currentCost) {
            return Number(currentCost.current_cost);
        }
        return null;
    }

    public async  insertChargifyBillable(componentName: string, description: string, qty: number, userId: string) {
        const userPlan = await deliveryOrderCompleteService.getUserPlanByUserIdAndPlanId(userId, 'enterprise');
        // insert only non enterprise user
        let isEnterpriseMerchant = false;
        if (userPlan) {
            isEnterpriseMerchant = true;
        }

        if (!isEnterpriseMerchant) {
            if (componentName == 'Big Data Analytics') {
                const bigDataStatusOfUser = await deliveryOrderCompleteService.getUserBigDataStatusByUserId(userId);
                if (bigDataStatusOfUser) {
                    if (bigDataStatusOfUser.big_data_status == 0) {
                        return false;
                    }
                }
            }
            // not big data proceed
            const chargifyComponentId = await deliveryOrderCompleteService.getChargifyComponentIdByComponentName(componentName);
            if (!chargifyComponentId) {
                console.log('component name ' + componentName + ' not found!');
                return false;
            } else {
                const componentId = chargifyComponentId.id;
                const chargifyBillable = deliveryOrderCompleteService.addChargifyBillable(componentId, description, qty, userId, 'Pending');
            }
        }
    }
}