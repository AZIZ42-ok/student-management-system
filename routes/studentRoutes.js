const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentControllers');

// GET routes
router.get('/', verifyToken, studentController.getStudents);
router.get('/department', verifyToken, studentController.getStudentsByDepartment);
router.get('/age', verifyToken, studentController.getStudentsByAge);
router.get('/name', verifyToken, studentController.getStudentsByName);
router.get('/:id', verifyToken, studentController.getStudentByMatricule);

// POST, PUT and DELETE routes
router.post('/', verifyToken, studentController.createStudent);
router.put('/:id', verifyToken, studentController.updateStudent);
router.delete('/:id', verifyToken, studentController.deleteStudent);

module.exports = router;