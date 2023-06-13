const express = require("express")
const { User } = require("./models")
const { Animal } = require("./models")
const { Service } = require("./models")
const { ServiceType } = require("./models")

const app = express()

app.use(express.json())
app.use("/users", express.static('./html/users.html'))
app.use("/animals", express.static('./html/animals.html'))
app.use("/service-type", express.static('./html/service-type.html'))
app.use("/services", express.static('./html/services.html'))

app.use("/index.css", express.static('./index.css'))
app.use("/animals.js", express.static('./animals.js'))
app.use("/users.js", express.static('./users.js'))
app.use("/service-type.js", express.static('./service-type.js'))
app.use("/services.js", express.static('./services.js'))

app.get('/api/user', async (request, response) => {
    const users = await User.findAll()
    response.json(users)
})

app.post('/api/user', async (request, response) => {
    const newUser = {
        name: request.body.name,
        birthDate: request.body.birthDate,
        email: request.body.email,
        cpf: request.body.cpf,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const user = await User.create(newUser)
    response.json(user)
})

app.delete("/api/user/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário um id para deletar um usuário" })
        return
    }

    User.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteUsersCount: data })
        })
        .catch((erro) => {
            response.status(500).send({
                message:
                    erro.message || "Ocorreu um erro ao tentar criar um novo usuário.",
            })
        })
})

app.get('/api/animal', async (request, response) => {
    const animals = await Animal.findAll()
    response.json(animals)
})

app.post('/api/animal', async (request, response) => {
    const newAnimal = {
        name: request.body.name,
        breed: request.body.breed,
        age: request.body.age,
        weight: request.body.weight,
        owner_name: request.body.owner_name,
        is_vacinated: request.body.is_vacinated,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const animals = await Animal.create(newAnimal)
    response.json(animals)
})

app.delete("/api/animals/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário um id para deletar um animal" })
        return
    }

    Animal.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteAnimalsCount: data })
        })
        .catch((erro) => {
            response.status(500).send({
                message:
                    erro.message || "Ocorreu um erro ao tentar criar um novo animal.",
            })
        })
})

app.get('/api/service', async (request, response) => {
    const services = await Service.findAll()
    response.json(services)
})

app.post('/api/service', async (request, response) => {
    const newService = {
        service_type: request.body.service_type,
        animal: request.body.animal,
        scheduled_date: request.body.scheduled_date,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const services = await Service.create(newService)
    response.json(services)
})

app.delete("/api/service/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário um id para deletar um serviço" })
        return
    }

    Service.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteServicesCount: data })
        })
        .catch((erro) => {
            response.status(500).send({
                message:
                    erro.message || "Ocorreu um erro ao tentar criar um novo serviço.",
            })
        })
})

app.get('/api/service-type', async (request, response) => {
    const serviceTypes = await ServiceType.findAll()
    response.json(serviceTypes)
})

app.post('/api/service-type', async (request, response) => {
    const newServiceTypes = {
        name: request.body.name,
        price: request.body.price,
        duration: request.body.duration,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const serviceTypes = await ServiceType.create(newServiceTypes)
    response.json(serviceTypes)
})

app.delete("/api/service-type/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário um id para deletar um tipo de serviço" })
        return
    }

    ServiceType.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteServicesTypeCount: data })
        })
        .catch((erro) => {
            response.status(500).send({
                message:
                    erro.message || "Ocorreu um erro ao tentar criar um novo tipo de serviço.",
            })
        })
})

app.listen(3000, () => {
    console.log(`Servidor está rodando em http://localhost:3000`)
})