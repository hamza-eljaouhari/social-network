
    const express             = require('express');
    const router              = express.Router();
    const subscriptionController  = require('../controllers/subscriptionController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/subscriptions', webMiddleware.checkJWT, subscriptionController.getSubscriptions);
    router.get('/api/subscriptions/:id', webMiddleware.checkJWT, subscriptionController.getSubscription);
    router.post('/api/subscriptions', webMiddleware.checkJWT, subscriptionController.addSubscription);
    router.patch('/api/subscriptions/:id', webMiddleware.checkJWT, subscriptionController.editSubscription);
    router.delete('/api/subscriptions/:id', webMiddleware.checkJWT, subscriptionController.deleteSubscription);

    module.exports = router;
    