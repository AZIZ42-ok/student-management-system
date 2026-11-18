async function testProtectedPost() {

    // Login first
    const loginResponse = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'admin@gmail.com',
            password: 'admin12345'
        })
    });

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Create a student
    const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            matricule: 'CITEC2026099',
            name: 'David',
            age: 22,
            department: 'Software Engineering'
        })
    });

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testProtectedPost();