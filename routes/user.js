
    const express             = require('express');
    const router              = express.Router();
    const userController  = require('../controllers/userController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/users', webMiddleware.checkJWT, userController.getUsers);
    router.get('/api/users/:id/communities', webMiddleware.checkJWT, userController.getUserCommunities);
    router.get('/api/users/:id', userController.getUser);
    router.post('/api/users', userController.addUser);
    router.patch('/api/users/:id', userController.editUser);
    router.delete('/api/users/:id',webMiddleware.checkJWT,userController.deleteUser);

    router.post('/api/user/signup',userController.signUp) 

    router.post('/api/user/signin',userController.signIn) 

    router.get('/api/user/feed', webMiddleware.checkJWT, userController.getUserFeed);

    router.post('/api/user/checkJWT', webMiddleware.checkJWT, userController.checkJWT);

    module.exports = router;
    