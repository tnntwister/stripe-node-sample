const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const stripe = require('stripe')('sk_test_51LqC9vJmZ3USYKbxorWjOecrETLcQ3ssFi1c8cgymLQsXvA8WsT72wLaHj6FR6brdNaHPY5X76rlEO8uxob6fibr001hBFp7b6');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.use(express.static('./views'));

app.use(bodyParser.urlencoded({ extended: true }))

app.post("/charge", (req, res) => {
  try {
    stripe.customers
      .retrieve('cus_MZLTGUfhjfpBAS')
      .then(customer => 
        stripe.charges.create({
          amount: req.body.amount * 100,
          currency: "usd",
          customer: customer.id
        })
      )
      .then(() => res.render("success.html"))        
      .catch(err => console.log(err));
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
          source: req.body.stripeToken
        })
        .then(customer =>
          stripe.charges.create({
            amount: req.body.amount * 100,
            currency: "usd",
            customer: customer.id
          })
        )
        .then(() => res.render("success.html"))        
        .catch(err => console.log(err));
    } catch (err) {
      res.send(err);
    }
  });

app.get('/', function(req, res) {
    let customer = {};
    try {
      stripe.customers
        .retrieve('cus_MZLTGUfhjfpBAS')
        .then((response) => res.render("index.html", { customer : response }))        
        .catch(err => console.log(err));
    } catch (err) {
      res.send(err);
    }
  });

app.listen(3000, () => console.log('Server is running...'));
