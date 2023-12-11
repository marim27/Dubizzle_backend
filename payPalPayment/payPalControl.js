const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';
// generate payment Access Token
async function generateAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  if (response.status === 200 || response.status === 201) {
    const jsonData = await response.json();
    return jsonData.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
// create paypal Order
async function createOrder(data) {
  // console.log(data);
  const accessToken = await generateAccessToken();
  const response = await fetch(`${base}/v2/checkout/orders`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: data.price,
          },
          redirect_urls: {
            return_url:data.return_url,
            
          }
        },
      ],
    }),
  });
  // console.log(response);
  if (response.status === 200 || response.status === 201) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
// create paypal Order controler
async function create_order(req, res) {
  try {
    const { cart } = req.body; // Assuming you receive cart data from the frontend
    const order = await createOrder(cart);
    // console.log(order.id);
    // console.log(order.status);
    res.status(200).json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: error.message });
  }
}
// to Approve order
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  return handleResponse(response);
};
  
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
// to Approve order controler
 async function capture_order(req, res)  {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};


function successPayment(req, res) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const executePayment = {
    payer_id: payerId,
  };
  paypal.payment.execute(paymentId, executePayment, (error, payment) => {
    if (error) {
      console.error(error);
    } else {
      res.send('good Payment');
    }
  });
};

module.exports = {
capture_order,
create_order,
successPayment
};
