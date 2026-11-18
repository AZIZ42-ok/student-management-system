async function testPost() {
    const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matricule: 'CITEC2026036',
            name: 'Peter',
            age: 24,
            department: 'Software Engineering'
        })
    });

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);
}

testPost();