async function testProtectedPut() {

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

    // Update student
    const response = await fetch('http://localhost:3000/students/CITEC2026099', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: 'David Updated',
            age: 23,
            department: 'Cyber Security'
        })
    });

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testProtectedPut();