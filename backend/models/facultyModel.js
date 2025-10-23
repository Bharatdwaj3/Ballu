const express = require('express')
const mongoose = require('mongoose');
const facultySchema = require('../schemas/facultySchema');

const facultyModel = mongoose.model('facultyModel', facultySchema,'faculty');
module.exports=facultyModel;