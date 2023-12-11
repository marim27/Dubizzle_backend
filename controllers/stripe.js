// const stripe = require("stripe")(
//   "sk_test_51MkZ8RBgdwC9BMriwt0DTSdzVfZnBmCPEuaFEAWl7di4bMeDGAJH8OjHaPl4ILmzwvzEkbAK8wNOMRPXuls9UUsD00wbxsaT3t"
// );

// exports.payment = async function (req, res) {
//   console.log(req.body);
//   let { amount, id } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "EUR",
//       amount: amount,
//       automatic_payment_methods: { enabled: true },
//     });

//     console.log("Payment", paymentIntent);
//     res.json({
//       message: "Payment successful",
//       success: true,
//       return_url: "http://localhost:5173", // Specify your success URL here
//       client_secret: paymentIntent.client_secret,
//       res: paymentIntent,
//     });
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({ error: "Payment failed" });
//   }
// };

// exports.getInfo = async function (req, res) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "EUR",
//       amount: 1999,
//       automatic_payment_methods: { enabled: true },
//     });

//     res.json({
//       client_secret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating paymentIntent:", error);
//     res.status(500).json({ error: "Failed to create paymentIntent" });
//   }
// };

// try {
//   // data from request
//   // const { token, amount, description,id } = req.body;
//   // stripe.paymentI
//   // Create a charge using the Stripe secret key
//   const charge = await stripe.paymentIntents.create({
//     // source: token.id,
//     // amount: amount * 100, // Amount in cents (Stripe requires amounts in the smallest currency unit)
//     // currency: "usd", // Change to your currency code
//     // description: description, // Customize description
//     amount,
//     currency: "USD",
//     description: "Spatula company",
//     payment_method: id,
//     confirm: true,
//   });

//   // Payment successful, send a success response
//   res.status(200).json({ success: true, charge });
// }catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({ error: "Payment failed" });
//   }
// };

// const payment = await stripe.paymentIntents.create({
//   amount,
//   currency: "USD",
//   description: "Spatula company",
//   payment_method: id,
//   confirm: true,
//   automatic_payment_methods: {
//     enabled: true,
//     allow_redirects: "never",
//   },
// });

const stripe = require("stripe")(
  "sk_test_51MkZ8RBgdwC9BMriwt0DTSdzVfZnBmCPEuaFEAWl7di4bMeDGAJH8OjHaPl4ILmzwvzEkbAK8wNOMRPXuls9UUsD00wbxsaT3t"
);

exports.payment = async function (req, res) {
  console.log(req.body);
  let { amount, id } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EGP",
      amount: amount,
      // userID: userID,
      id:id,
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

exports.getInfo = function (req, res) {
  res.send({
    publishableKey:
      "pk_test_51MkZ8RBgdwC9BMriD244ZwXAcofCNQUx3xbCkBEK4Vc1c8da8X03UEbIJMDdnya93xhadKrpgMzSzfVYJbTDBubJ00MhIg6xSA",
  });
};

