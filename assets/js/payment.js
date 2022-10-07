const stripe = Stripe('pk_test_51LqC9vJmZ3USYKbx4ftxn0PLufcv4v7dAeSw9NBCN5cSfw2xCKaRQppVmyl558dUnR2iXAYtL8hGVsn6cd5RhprX00f0PPTzBz'); 
const elements = stripe.elements();

const card1 = card2 = elements.create("card", { hidePostalCode: true });
card1.mount("#payment-card");
const form1 = document.querySelector("#form1");
const errors1 = document.querySelector("#payment-errors-1");
card2.mount("#payment-card2");
const form2 = document.querySelector("#form2");
const errors2 = document.querySelector("#payment-errors-2");

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  stripe.createToken(card1).then((res) => {
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

form2.addEventListener("submit", (event) => {
  event.preventDefault();
  stripe.createToken(card2).then((res) => {
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
