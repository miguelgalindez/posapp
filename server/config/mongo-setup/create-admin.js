db = connect("localhost:27017/admin", adminUsername, adminPwd)
db.dropUser(adminUsername);
db.createUser({
    user: adminUsername,
    pwd: adminPwd,
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})