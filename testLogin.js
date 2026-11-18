async function testLogin() {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'admin@gmail.com',
            password: 'admin12345'
        })
    });

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testLogin();