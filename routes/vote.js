
    const express             = require('express');
    const router              = express.Router();
    const voteController  = require('../controllers/voteController')
    const webMiddleware       = require('../middleware/web');
  
    router.get('/api/votes',webMiddleware.checkJWT,voteController.getVotes);
    router.get('/api/votes/:id',webMiddleware.checkJWT,voteController.getVote);
    router.post('/api/votes',webMiddleware.checkJWT,voteController.addVote);
    router.patch('/api/votes/:id',webMiddleware.checkJWT,voteController.editVote);
    router.delete('/api/votes/:id/:subject_id/:subject_type',webMiddleware.checkJWT,voteController.deleteVote);

    module.exports = router;
    