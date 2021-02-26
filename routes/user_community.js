
    const express             = require('express');
    const router              = express.Router();
    const user_communityController  = require('../controllers/user_communityController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/user_communities',webMiddleware.checkJWT,user_communityController.getUser_communities);
    router.get('/api/user_communities/:id',webMiddleware.checkJWT,user_communityController.getUser_community);
    router.post('/api/user_communities',webMiddleware.checkJWT,user_communityController.addUser_community);
    router.patch('/api/user_communities/:id',webMiddleware.checkJWT,user_communityController.editUser_community);
    router.delete('/api/user_communities/:id',webMiddleware.checkJWT,user_communityController.deleteUser_community);

    
    

    module.exports = router;
    