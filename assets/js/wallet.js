const stripe = Stripe('pk_test_51LqC9vJmZ3USYKbx4ftxn0PLufcv4v7dAeSw9NBCN5cSfw2xCKaRQppVmyl558dUnR2iXAYtL8hGVsn6cd5RhprX00f0PPTzBz'); 
const elements = stripe.elements();
const card = elements.create("card", { hidePostalCode: true });
card.mount("#payment-card");
const form = document.querySelector("form");
const errors = document.querySelector("#payment-errors");

form.addEventListener("submit", (event) => {
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