const express=require('express');
const { loginUser, profileUser, registerUser}=require('../controllers/userController');
const authUser = require('../middleware/auth.middleware');
const router=express.Router();


router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/profile',authUser,profileUser);


module.exports = router;
