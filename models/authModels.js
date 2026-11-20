const dbPromise = import('../src/prismaClient.mjs');

async function registerUser(user) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.users;

    const query = db.raw.sql`
        INSERT INTO users (username, email, password)
        VALUES (${user.username}, ${user.email}, ${user.password})
        RETURNING id, username, email, created_at AS "createdAt"
    `
    .returnsRow({
        id: table.columns.id,
        username: table.columns.username,
        email: table.columns.email,
       createdAt: table.columns.created_at
    })
    .build();

    const result = await db.query(query);

    return result[0];
}

async function findFirstUser() {
    const { default: db } = await dbPromise;

    const result = await db.query(
        db.raw.sql`SELECT id FROM users LIMIT 1`.build()
    );

    return result[0];
}

async function findUserByEmail(email) {
    const { default: db } = await dbPromise;

    const table = db.sql.public.users;

    const query = db.raw.sql`
       SELECT id, username, email, password, created_at AS "createdAt"
        FROM users
        WHERE email = ${email}
    `
    .returnsRow({
        id: table.columns.id,
        username: table.columns.username,
        email: table.columns.email,
        password: table.columns.password,
       createdAt: table.columns.created_at
    })
    .build();

    const result = await db.query(query);

    return result[0];
}


module.exports = {
    registerUser,
    findUserByEmail,
    findFirstUser
};