
    const express             = require('express');
    const router              = express.Router();
    const communityController  = require('../controllers/communityController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/communities',webMiddleware.checkJWT,communityController.getCommunities);
    router.get('/api/communities/:id',webMiddleware.checkJWT,communityController.getCommunity);
    router.post('/api/communities',webMiddleware.checkJWT,communityController.addCommunity);
    router.patch('/api/communities/:id',webMiddleware.checkJWT,communityController.editCommunity);
    router.delete('/api/communities/:id',webMiddleware.checkJWT,communityController.deleteCommunity);

    
    

    module.exports = router;
    