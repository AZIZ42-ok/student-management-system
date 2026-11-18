async function testDelete() {
    const response = await fetch('http://localhost:3000/students/CITEC2026003', {
        method: 'DELETE'
    });

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);
}

testDelete();