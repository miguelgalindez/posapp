db = connect("localhost:27017/admin")
db.dropUser(adminUsername);
db.createUser({
    user: adminUsername,
    pwd: adminPwd,
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})