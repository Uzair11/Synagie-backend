const GWP_ATTRIBUTES: Array<String> = [
    'code',
    'name',
    'user_id',
    'start_at',
    'end_at',
    'gwp_type',
    'created_by_id',
    'created_datetime',

    'discount_type',
    'discount_amount',
    'discount_percent',

    'cond_min_order_amount',
];

export class GWPService {
    getList(columnSort: String, sortType: String) {
        return Gwp.findAll({
            attributes: GWP_ATTRIBUTES,
            include: [{ model: User, as: 'created_by', attributes: ['first_name', 'last_name', 'email'] }],
            order: [[columnSort, sortType]],
        });
    }
}
