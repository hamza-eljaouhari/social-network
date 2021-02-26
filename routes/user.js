
    const express             = require('express');
    const router              = express.Router();
    const userController  = require('../controllers/userController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/users',userController.getUsers);
    router.get('/api/users/:id/profile',userController.getUserCommunities);
    router.get('/api/users/:id',userController.getUser);
    router.post('/api/users',webMiddleware.checkJWT,userController.addUser);
    router.patch('/api/users/:id',webMiddleware.checkJWT,userController.editUser);
    router.delete('/api/users/:id',webMiddleware.checkJWT,userController.deleteUser);

    router.post('/api/user/signup',userController.signUp) 

    router.post('/api/user/signin',userController.signIn) 


    module.exports = router;
    