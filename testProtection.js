async function testProtection() {

    // First, log in
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

    // Now access students using the token
    const response = await fetch('http://localhost:3000/students', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testProtection();