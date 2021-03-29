const express = require('express');
const app = express();
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const requireToken = require('./requireToken');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Student = require('./model/student')


mongoose.connect("mongodb+srv://useryadav:g8rRHjsuW5aRIx2t@firstcluster.atiaw.mongodb.net/nodeShop?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
mongoose.connection.on('connected', connted => {
    console.log("database connected")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Adno-GqrenUMKw8gSZvEMGkXCU-7h1xcoAOHf7FVM3u6JW0ttsg94s7QttItYdMf_U1Vo2p5EfvmPiVy',
    'client_secret': 'ENh9WG3aMWMUgtrjDzqJd21p2KhXxNGIR2RJNmOID9qxr0UuviN57UUwdciM5W42ZkoEgdpCHuFyCm77'
    //'client_secret' : 'ENOZY1jOcjfyfx50PF6TM3cFPSg2Js5l4kPOqK2UX2WQwHi9oHWYhi6bBYhyYre85cAmr7LS2as1YQ6M'
});



let totalAmount = 0;
console.log("totalAmount" + totalAmount)
app.set('view engine', 'ejs');

app.post('/', (req, res) => {
    //res.render('index')
    //res.send('welcome')

    const student = new Student({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        paymentStatus: ''
    })
    student.save().then(result => {
        console.log("saved Result----", result)
        //console.log("JSON saved Result----",res.json(result))
        res.json(result)
    }).catch(err => {
        console.log(err)
    })

});


app.post('/pay', (req, res) => {
    //totalAmount = Number(req.body.quantity)*Number(req.body.price)

    // console.log("totalAmount---------" + totalAmount)
    console.log("Fee Amount", req.body.fee)
    totalAmount = Number(req.body.fee)
    console.log("Fee Amount Number--***---", totalAmount)
    const create_payment_json = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },

        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item  ",
                    "sku": "item",
                    "price": totalAmount,
                    "currency": "USD",
                    "quantity": 1

                }]
            },
            "amount": {

                "currency": "USD",
                "total": totalAmount,

            }

        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        console.log(payment)
        if (error) {
            console.log(error)
            throw error;

        } else {

            console.log("Create Payment Response");
            //console.log(payment);
            // res.send('test')

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    console.log("Redirecting -- ", payment.links[i])
                    console.log(payment.links[i].href)
                    res.redirect(payment.links[i].href)
                    break;
                }

            }


        }
    });


})

app.post('/payFee', (req, res) => {
    totalAmount = Number(req.body.quantity) * Number(req.body.price)

    console.log("totalAmount---------" + totalAmount)
    //console.log(Number(req.body.price)*10)
    const create_payment_json = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },

        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item  ",
                    "sku": "item",
                    "price": Number(req.body.price),
                    "currency": "USD",
                    "quantity": Number(req.body.quantity)
                }]
            },
            "amount": {
                "currency": "USD",
                "total": Number(req.body.quantity) * Number(req.body.price)
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error)
            throw error;

        } else {

            console.log("Create Payment Response");
            //console.log(payment);
            // res.send('test')

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    console.log("Redirecting -- ", payment.links[i])
                    console.log(payment.links[i].href)
                    res.redirect(payment.links[i].href)
                    break;
                }

            }


        }
    });


})

app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": totalAmount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            // res.render('paymentError');
            res.redirect('http://localhost:3000/fail')
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            //res.render('paymentInfo');
            res.redirect('http://localhost:3000/success')
        }
    });
});

app.get('/cancel', (req, res) => res.redirect('http://localhost:3000/fail'));

app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    Student.findOne({ email: email })
        .then(savedstudent => {
            console.log(savedstudent)
            if (!savedstudent) {
                return res.status(422).json({ error: "Invalid email or password" })
            } else if (savedstudent.email === email && savedstudent.password === password) {
             return res.json(savedstudent)
            } else {
                return res.status(422).json({ error: "Invalid email or password" })

            }
        }).catch(err => {
            console.log(err)
            //res.redirect('http://localhost:3000/login')
        })
})

app.post('/getStudent', (req, res) => {
    const { email} = req.body
    Student.findOne({ email: email }).then(result => {
        res.json(result)
    }).catch(err =>{
        console.log(err)
    })
})

app.listen(5000, () => {
    console.log('port listening on 5000')
})