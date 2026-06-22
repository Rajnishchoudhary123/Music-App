const express = require('express');
const { getDashboardState, incrementPlayCount } = require('../Controller/AdminDashboardController');



const router = express.Router();

router.get("/dashboard" , getDashboardState );

router.put("/play/:id" , incrementPlayCount);


module.exports = router;