const dbPromise = import('../src/prismaClient.mjs');


// GET ALL STUDENTS
async function getAllStudents() {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        SELECT matricule, name, age, department
        FROM students
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const students = await db.query(query);

    return students;
}


// ADD A STUDENT
async function addStudents(student) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        INSERT INTO students (matricule, name, age, department)
        VALUES (
            ${student.matricule},
            ${student.name},
            ${student.age},
            ${student.department}
        )
        RETURNING matricule, name, age, department
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const result = await db.query(query);

    return result[0];
}


// UPDATE A STUDENT
async function updateStudent(matricule, student) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        UPDATE students
        SET
            name = ${student.name},
            age = ${student.age},
            department = ${student.department}
        WHERE matricule = ${matricule}
        RETURNING matricule, name, age, department
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const result = await db.query(query);

    return result[0];
}


// DELETE A STUDENT
async function deleteStudent(matricule) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        DELETE FROM students
        WHERE matricule = ${matricule}
        RETURNING matricule, name, age, department
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const result = await db.query(query);

    return result[0];
}


// GET STUDENT BY MATRICULE
async function getStudentByMatricule(matricule) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        SELECT matricule, name, age, department
        FROM students
        WHERE matricule = ${matricule}
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const result = await db.query(query);

    return result[0];
}


// GET STUDENTS BY DEPARTMENT
async function getStudentsByDepartment(department) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;
    const searchTerm = `%${department}%`;

    const query = db.raw.sql`
        SELECT matricule, name, age, department
        FROM students
        WHERE department ILIKE ${searchTerm}
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const students = await db.query(query);

    return students;
}


// GET STUDENTS BY AGE
async function getStudentsByAge(age) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;

    const query = db.raw.sql`
        SELECT matricule, name, age, department
        FROM students
        WHERE age = ${Number(age)}
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const students = await db.query(query);

    return students;
}


// GET STUDENTS BY NAME
async function getStudentsByName(name) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.students;
    const searchTerm = `%${name}%`;

    const query = db.raw.sql`
        SELECT matricule, name, age, department
        FROM students
        WHERE name ILIKE ${searchTerm}
    `
    .returnsRow({
        matricule: table.columns.matricule,
        name: table.columns.name,
        age: table.columns.age,
        department: table.columns.department
    })
    .build();

    const students = await db.query(query);

    return students;
}



module.exports = {
    getAllStudents,
    addStudents,
    updateStudent,
    deleteStudent,
    getStudentByMatricule,
    getStudentsByDepartment,
    getStudentsByAge,
    getStudentsByName
};