import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
    try {
        const { name, quantity, amount } = req.body;
        const payment = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            payment_method_types: ['card', 'oxxo'],
            payment_method_options: {
                oxxo: {
                    expires_after_days: 3,
                }
            },
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: {
                            name: name,
                        },
                        unit_amount: amount,
                    },
                    quantity: quantity,
                }
            ],
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel',
        });
        res.redirect(payment.url);
    } catch (error) {
        res.json(error.raw.message);
    }
}

const completePayment = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    } catch (error) {
        res.json(error.raw.message);
    }
}

