import { DeliveryOrderItems } from '../models/DeliveryOrderItems';
import { SKU } from '../models/SKU';
import { SKUImage } from '../models/SKUImage';

export class DeliveryOrderItemsService {
    public getOrderitems(orderId: string) {
        return DeliveryOrderItems.findAll({
            where: {
                order_id: orderId
            },
            include: {
                model: SKU,
                as: 'sku',
                attributes: ['product_name', 'legacy_code', 'selling_price'],
                include: {
                    model: SKUImage,
                    as: 'sku_image',
                    attributes: ['url']
                }
            },
            attributes: ['sku_id', 'quantity', 'preferred_bin_id']
        });
    }
}
