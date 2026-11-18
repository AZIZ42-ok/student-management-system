const dbPromise = import('./src/prismaClient.mjs');

async function testUsers() {
    const { default: db } = await dbPromise;

    const table = db.sql.public.users;

    console.log("Users table:", table);
    console.log("Users columns:", table.columns);
}

testUsers();