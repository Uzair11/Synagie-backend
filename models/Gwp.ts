import * as mongoose from 'mongoose';

enum GWP_DISCOUNT_TYPE {
    Percent = 'percent',
    Amount = 'amount',
}

enum GWP_TYPE_ENUM {
    Discount = 'discount',
    BuyXFreeY = 'buyx',
    FreeGift = 'freegift',
}

const GwpSchema = new mongoose.Schema({
    code: String,
    user_id: String,
    start_at: Date,
    end_at: Date,
    gwp_type: GWP_DISCOUNT_TYPE,

    discount_amount: Number,
    discount_percent: Number,
    discount_type: GWP_DISCOUNT_TYPE,

    buyx_quantity: Number,
    buyx_free_quantity: Number,

    cond_min_order_amount: Number,

    created_by_id: String,
    created_datetime: Date,
});

export const Gwp = mongoose.model('Gwp', GwpSchema, 'Gwp');
