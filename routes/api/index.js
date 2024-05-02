const router = require('express').Router();
const usersRoutes = require('./courseRoutes');
const thoughtRoutes = require('./studentRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;