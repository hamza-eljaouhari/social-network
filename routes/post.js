
    const express             = require('express');
    const router              = express.Router();
    const postController  = require('../controllers/postController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/posts/:page_number/:per_page',webMiddleware.checkJWT,postController.getPostsWithPagination);
    router.get('/api/posts',webMiddleware.checkJWT,postController.getPosts);
    router.get('/api/posts/:id',webMiddleware.checkJWT,postController.getPost);
    router.post('/api/posts',webMiddleware.checkJWT,postController.addPost);
    router.patch('/api/posts/:id',webMiddleware.checkJWT,postController.editPost);
    router.delete('/api/posts/:id',webMiddleware.checkJWT,postController.deletePost);

    
    

    module.exports = router;
    