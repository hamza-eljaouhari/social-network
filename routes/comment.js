
    const express             = require('express');
    const router              = express.Router();
    const commentController  = require('../controllers/commentController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/comments',webMiddleware.checkJWT,commentController.getComments);
    router.get('/api/comments/:id',webMiddleware.checkJWT,commentController.getComment);
    router.post('/api/comments',webMiddleware.checkJWT,commentController.addComment);
    router.patch('/api/comments/:id',webMiddleware.checkJWT,commentController.editComment);
    router.delete('/api/comments/:id',webMiddleware.checkJWT,commentController.deleteComment);

    
    

    module.exports = router;
    