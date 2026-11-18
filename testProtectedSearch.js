async function testProtectedSearch() {

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

    // Search students by department
    const response = await fetch(
        'http://localhost:3000/students/department?department=Software Engineering',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testProtectedSearch();