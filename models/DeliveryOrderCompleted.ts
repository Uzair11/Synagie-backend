import * as mongoose from 'mongoose';

const DeliveryOrderCompletedSchema = new mongoose.Schema({
    delivery_datetime: Date,
    gst: Number,
    order_total: Number,
    order_id: String,
    order_counter: Number,
    value_added_services: [],
    sales_total: Number,
    user_id: String,
    order_num: String,
    payment_mode: String,
    discount_value: Number,
    shipping_cost: Number,
    completed_datetime: Date,
    delivery_cost: Number,
    recipient_name: String,
    status: String,
    address: String,
    postal_code: String,
    handling_cost: Number,
    delivery_period: String,
    box_count: Number,
    special_request: String,
    recipient_email: String,
    channel_order_id: String,
    coupon_value: Number,
    user_data: {
        _id: { id: false },
        first_name: String,
        last_name: String,
        email: String,
        postal_code: Number,
        created_datetime: Date,
        billing_address: String,
        company: String,
        phone_number: String,
        plan: [
            {
                _id: { id: false },
                plan_name: String,
                delivery_item_threshold: Number,
                plan_id: String,
                price: Number,
                per_delivery: Number,
                bin_amount: Number,
                per_delivery_item: Number
            }
        ]
    },
    boxes: [
        {
            _id: { id: false },
            awb: String,
            weight: Number,
            box_width: Number,
            box_height: Number,
            box_length: Number,
            items: [
                {
                    _id: { id: false },
                    sku_id: String,
                    sku: {
                        _id: { id: false },
                        seller_item_code: String,
                        weight: Number,
                        item_width: Number,
                        agreed_price: Number,
                        item_brand: String,
                        selling_price: Number,
                        retail_price: Number,
                        commission_rate_rate: Number,
                        legacy_code: String,
                        weighted_average_cost: Number,
                        item_length: Number,
                        cost_price: Number,
                        channel: Number,
                        product_name: String,
                        seller_item_sku: String,
                        item_height: Number,
                        commission_rate: Number
                    },
                    is_kit: Number,
                    chosen_bin_id: String,
                    quantity: Number,
                    parent_sku_id: String
                }
            ],
            delivery_method: {
                _id: { id: false },
                method_id: Number,
                divisor: Number,
                delivery_name: String,
                delivery_weight_range: [
                    {
                        _id: { id: false },
                        price: Number,
                        lower_bound: Number,
                        upper_bound: Number
                    }
                ],
                delivery_code: String,
                flat_fee: Number
            }
        }
    ],
    channel: {
        _id: { id: false },
        channel_id: Number,
        name: String
    },
    delivery_status: {
        _id: { id: false },
        updated_at: Date,
        status: String,
        closed: Number
    },
    contact_no: String,
    created_datetime: Date,
    inserted_datetime: Date,
    selling_price_total: Number,
    country_code: String,
    city: String,
    state: String,
    address_type: String,
    tax_id: String,
    currency: String,
    exchange_rate: String
});

export const DeliveryOrderCompleted = mongoose.model('DeliveryOrderCompleted', DeliveryOrderCompletedSchema, 'DeliveryOrderCompleted')
