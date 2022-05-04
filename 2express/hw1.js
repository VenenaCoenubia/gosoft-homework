const game24 = require('24game-solver/dist/24game-solver')
const express = require('express');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    if (!req.query.n1 ||
        !req.query.n2 ||
        !req.query.n3 ||
        !req.query.n4
    ) return res.send("Error Data")

    const numberregex = /^[1-9]{1,1}$/

    if (
        !numberregex.exec(req.query.n1) ||
        !numberregex.exec(req.query.n2) ||
        !numberregex.exec(req.query.n3) ||
        !numberregex.exec(req.query.n4)
    ) return res.send("Error Input Value")

    const numbers = [
        parseInt(req.query.n1),
        parseInt(req.query.n2),
        parseInt(req.query.n3),
        parseInt(req.query.n4),
    ]

    const result = game24(numbers, 24)

    if (result.length > 0) return res.send({ msg: "Success", result })
    else return res.send({ msg: "Fail: No Solution" })
})


app.listen(3000, () => {
    console.log('Listening on port: 3000');
});