const express=require('express');
const upload=require('../services/multer');
const router=express.Router();
const{
    getStudent, createStudent, updateStudent, deleteStudent,
    getStudents, 

} =require('../controllers/studentComtroller');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_students'),
    getStudents);
router.get('/:id',
    roleMiddleware(['admin','student']), 
    checkPermission('view_student'),
    getStudent);
router.post('/:id',
    upload.single('image'),
    roleMiddleware(['admin']),
    checkPermission('create_student'),
    createStudent);
router.put('/:id',
    upload.single('image'),
    roleMiddleware(['admin','faculty']), 
    checkPermission('update_student'),
    updateStudent);
router.delete('/:id',deleteStudent);

module.exports=router;