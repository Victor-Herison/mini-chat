require('dotenv').config();

test(`${process.env.HOST}/user/register`, async () => {
    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: "Teste automatizado",
          email: "email@teste.automatizado",
          password: "Senha generica 123",
        }),
    })
    expect(response.status).toBe(201);
    
})
let autorization = '';
test('login to /login => 200', async () => {
    const response = await fetch(`${process.env.HOST}/user/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: "Teste automatizado",
          email: "email@teste.automatizado",
          password: "Senha generica 123",
        }),
    })
    autorization = response.headers.get('Authorization');
    expect(response.status).toBe(200);
    
})


test('delete to /delete-user => 200', async () => {
    const response = await fetch(`${process.env.HOST}/user/delete-user`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": autorization,
        },
        body: JSON.stringify({
          nickname: "Teste automatizado",
          email: "email@teste.automatizado",
          password: "Senha generica 123",
        }),
    })
    expect(response.status).toBe(200);
    
})


// router.post("/register", userController.createUser);
// router.post("/login", userController.login);
// router.patch("/update-password", auth, userController.updateUserPassword);
// router.patch("/update-nickname", auth, userController.updateUserNickname);
// router.get("/get-user", auth, userController.getUser);
// router.delete("/delete-user", auth, userController.deleteUser);