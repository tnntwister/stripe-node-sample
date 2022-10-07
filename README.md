# stripe-node-sample

## how to use

### 1. create a .env file for your stripe test keys

```
STRIPE_TEST_PK="pk_test_xxx"
STRIPE_TEST_SK="sk_test_xxx"
STRIPE_CUSTOMER_ID="cus_xxx"
```

### 2. install npm dependancies

```
npm install
```

### 3. launch project

```
nodemon index.js
```

### 4. open your bro(wser)

go to [http://localhost:3000/](http://localhost:3000/)

## Routes

-   /pay-with-existing-customer
-   /create-new-customer-and-pay
-   /list-all-intents
