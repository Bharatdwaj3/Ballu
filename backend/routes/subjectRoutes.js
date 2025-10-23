const express=require('express');
const router=express.Router();

const{
    getSubject, createSubject, updateSubject, deleteSubject,
    getSubjects, 
} =require('../controllers/subjectController');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/',roleMiddleware(['admin','faculty','student']),checkPermission('view_subjects'),getSubjects);
router.get('/:id',roleMiddleware(['admin','faculty','student']),checkPermission('view_subject'),getSubject);
router.post('/:id',roleMiddleware(['admin','student']),checkPermission('create_subject'),createSubject);
router.put('/:id',roleMiddleware(['admin','student']),checkPermission('update_subject'),updateSubject);
router.delete('/:id',roleMiddleware(['admin','student']),checkPermission('delete_subject'),deleteSubject);

module.exports=router;