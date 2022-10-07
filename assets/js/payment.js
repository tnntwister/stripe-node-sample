require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_TEST_PK);
const elements = stripe.elements();

const card = elements.create("card", { hidePostalCode: true });
card.mount("#payment-card");
const form1 = document.querySelector("#form");
const errors1 = document.querySelector("#payment-errors");

form1.addEventListener("submit", (event) => {
    event.preventDefault();
    stripe.createToken(card).then((res) => {
        if (res.error) {
            errors.textContent = res.error.message;
        } else {
            const stripeToken = document.createElement("input");
            stripeToken.setAttribute("type", "hidden");
            stripeToken.setAttribute("name", "stripeToken");
            stripeToken.setAttribute("value", res.token.id);
            form.appendChild(stripeToken);
            form.submit();
        }
    });
});
