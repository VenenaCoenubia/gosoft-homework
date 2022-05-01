//import
const express = require('express');

//create app
const app = express();
app.use(express.json());

let employee = []

//get
app.get('/getData', (request, response) => {
    response.send(employee);
})

//post
app.post('/createData', (request, response) => {

    const new_employee_data = {
        name_first: request.body.name_first,
        name_last: request.body.name_last,
        id: request.body.id,
        email: request.body.email,
        tel: request.body.tel,
        position: request.body.position
    }

    if (
        !new_employee_data.name_first ||
        !new_employee_data.name_last ||
        !new_employee_data.id ||
        !new_employee_data.email ||
        !new_employee_data.tel ||
        !new_employee_data.position
    ) {
        return response.status(400).send("error data not enough");
    }

    for (let i = 0; i < employee.length; i++) {
        if (
            employee[i].id == new_employee_data.id ||
            employee[i].email == new_employee_data.email ||
            employee[i].tel == new_employee_data.tel
        ) {
            return response.status(400).send("error data duplicate");
        }
    }

    employee.push(new_employee_data)

    response.send("ok");
})

app.delete('/removeData', (request, response) => {
    if (!request.body.id) {
        return response.status(400).send("error data not enough");
    }
    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == request.body.id) {
            employee.splice(i, 1);
            return response.send("ok");
        }
    }
    response.status(400).send("error data not found");
})

//put
app.put('/updateData', (request, response) => {
    if (
        !request.body.id || 
        !request.body.tel || 
        !request.body.email || 
        !request.body.position 
        ) {
        return response.status(400).send("error data not enough");
    }
    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == request.body.id) {

            employee[i].tel = request.body.tel
            employee[i].email = request.body.email
            employee[i].position = request.body.position

            return response.send("ok");
        }
    }
    response.status(400).send("error data not found");
})

//listen
app.listen(3000, () => {
    console.log('server started!');
});
