const express = require ("express");
const cors = require ("cors");
const dotenv = require ("dotenv");
// const { Message } = require("firebase-functions/v1/pubsub");
dotenv.config();
const stripe = require ("stripe")(process.env.STRIPE_KEY);


const app = express();
app.use(cors({ origin: true}));

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json({
        Message: "Success !",
    });
});

app.post("/payment/create", async(req, res)=>{

    const total = parseInt(req.query.total);
    if(total > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,});
    }else {
        res.status(403).json({ 
            message: "total must be greater tha 0",

        });
    }

});

app.listen(5000,(err) =>{
    if(err) throw err
    console.log("Amazon Server Runing on Port: 5000, http:localhost:5000")
})


