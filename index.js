require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const stripe = require("stripe")(process.env.STRIPE_TEST_SK);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/charge", (req, res) => {
    try {
        stripe.customers
            .retrieve(process.env.STRIPE_CUSTOMER_ID)
            .then((customer) =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id,
                })
            )
            .then(() => res.render("success.html"))
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.post("/charge-new-customer", (req, res) => {
    try {
        stripe.customers
            .create({
                name: "compte test 1",
                email: req.body.email,
                source: req.body.stripeToken,
            })
            .then((customer) =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id,
                })
            )
            .then(() => res.render("success.html"))
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.get("/", function (req, res) {
    let customer = {};
    try {
        stripe.customers
            .retrieve("cus_MZLTGUfhjfpBAS")
            .then((response) =>
                res.render("index.html", { customer: response })
            )
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.get("/pay-with-existing-customer", function (req, res) {
    let customer = {};
    try {
        stripe.customers
            .retrieve("cus_MZLTGUfhjfpBAS")
            .then((response) =>
                res.render("index.html", { customer: response })
            )
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.get("/pay-with-existing-customer", function (req, res) {
    let customer = {};
    try {
        stripe.customers
            .retrieve("cus_MZLTGUfhjfpBAS")
            .then((response) =>
                res.render("index.html", { customer: response })
            )
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.get("/create-new-customer-and-pay", function (req, res) {
    let customer = {};
    try {
        stripe.customers
            .retrieve("cus_MZLTGUfhjfpBAS")
            .then((response) =>
                res.render("index.html", { customer: response })
            )
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.get("/list-all-intents", async function (req, res) {
    let customer = {};
    try {
        await stripe.charges
            .list({
                limit: 3,
                customer: "cus_MZLZcoQjE6JsvC",
            })
            .then((response) =>
                res.render("list-all-intents.html", { intents: response })
            )
            .catch((err) => console.log(err));
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, () => console.log("Server is running..."));
