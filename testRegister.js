async function testRegister() {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'aziz',
            email: 'aziz@gmail.com',
            password: 'aziz12345'
        })
    });

    const result = await response.text();

    console.log('Status:', response.status);
    console.log('Response:', result);
}

testRegister();