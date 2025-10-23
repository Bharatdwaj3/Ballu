const express=require('express');
const router=express.Router();
const upload=require('../services/multer');
const{
    getFaculty, createFaculty, updateFaculty,deleteFaculty, 
    getFacultys,
    
} =require('../controllers/FacultyController');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_facultys'),
    getFacultys);
router.get('/:id',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_facultys'),
    getFaculty);
router.post('/:id',
    upload.single('image'),
    roleMiddleware(['admin',]),
    checkPermission('create_faculty'),
    createFaculty);
router.put('/:id',
    roleMiddleware(['admin']),
    checkPermission('update_faculty'),
    upload.single('image'),
    updateFaculty);
router.delete('/:id',
    roleMiddleware(['admin']),
    checkPermission('delete_facultys'),
    deleteFaculty);

module.exports=router;