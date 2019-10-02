import { Router } from 'express'
import { OrdersController } from '../controllers/OrdersController';

export const ordersRouter = Router()

ordersRouter.get('/pending', OrdersController.getPendingOrders);
ordersRouter.get('/completed', OrdersController.getCompletedOrders);
ordersRouter.get('/cancelled', OrdersController.getCancelledOrders);
ordersRouter.get('/backlog', OrdersController.getBacklogOrders);
ordersRouter.post('/complete/:orderId', OrdersController.markOrderAsComplete);
ordersRouter.get('/details/:orderId', OrdersController.getOrderDetails);
