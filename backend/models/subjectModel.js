const express = require('express')
const mongoose = require('mongoose');
const subjectSchema = require('../schemas/subjectSchema');

const subjectModel = mongoose.model('subjectModel', subjectSchema,'subject');
module.exports=subjectModel;