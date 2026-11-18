async function testPut() {
    const response = await fetch('http://localhost:3000/students/CITEC2026003', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Booba',
            age: 36,
            department: 'Cyber Security'
        })
    });

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);
}

testPut();