const studentModel = require('../models/studentsModels');

async function getStudents(req, res){
    try {
        const students = await studentModel.getAllStudents();
        res.send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createStudent(req, res){
    try {
        const student = await studentModel.addStudents(req.body);
        res.status(201).send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateStudent(req, res){
    try {
        const matricule = req.params.id;
        const student = await studentModel.updateStudent(
            matricule,
            req.body
        );

        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteStudent(req, res){
    try {
        const matricule = req.params.id;
        const student = await studentModel.deleteStudent(matricule);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getStudentByMatricule(req, res) {
    try {
        const matricule = req.params.id;

        const student = await studentModel.getStudentByMatricule(matricule);

        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getStudentsByDepartment(req, res) {
    try {
        const department = req.query.department;

        const students = await studentModel.getStudentsByDepartment(department);

        res.send(students);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getStudentsByAge(req, res) {
    try {
        const age = req.query.age;
        const students = await studentModel.getStudentsByAge(age);
        res.send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getStudentsByName(req, res) {
    try {
        const name = req.query.name;
        const students = await studentModel.getStudentsByName(name);
        res.send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }   
     }


module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByMatricule,
    getStudentsByDepartment,
    getStudentsByAge,
    getStudentsByName
};
