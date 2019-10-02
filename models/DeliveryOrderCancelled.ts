import * as mongoose from 'mongoose';

const DeliveryOrderCancelledSchema = new mongoose.Schema({
   order_id: String,
   sales_total: Number,
   user_id: String,
   order_num: String,
   cancelled_datetime: Date,
   status: String,
   channel_order_id: String,
   items: [
      {
         sku_id: String,
         sku: String,
         quantity: Number
      }
   ],
   channel: {
      channel_id: Number,
      name: String
   },
   shipping_cost: Number,
   created_datetime: Date
});

export const DeliveryOrderCancelled = mongoose.model('DeliveryOrderCancelled', DeliveryOrderCancelledSchema, 'DeliveryOrderCancelled')
