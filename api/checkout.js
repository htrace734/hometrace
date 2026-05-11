export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, address } = req.body;

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'mode': priceId.includes('single') ? 'payment' : 'subscription',
        'success_url': `https://hometrace-theta.vercel.app/success?address=${encodeURIComponent(address)}`,
        'cancel_url': `https://hometrace-theta.vercel.app`,
      }),
    });

    const session = await response.json();
    if (session.error) throw new Error(session.error.message);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


