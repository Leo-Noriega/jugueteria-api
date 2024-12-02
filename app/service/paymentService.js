import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
    try {
        const { items } = req.body;
        const cancel_url = `${process.env.FRONTEND_URL}carrito-de-compras`;
        const success_url = `${process.env.FRONTEND_URL}success?session_id={CHECKOUT_SESSION_ID}`;

        const line_items = items.map(item => {
            return {
                price_data: {
                    currency: 'mxn',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        });

        const payment = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'oxxo'],
            payment_method_options: {
                oxxo: {
                    expires_after_days: 3,
                }
            },
            mode: 'payment',
            line_items: line_items,
            success_url: success_url,
            cancel_url: cancel_url,
            shipping_address_collection: {
                allowed_countries: ['MX'],
            },
        });
        res.json({
            url: payment.url,
        });
    } catch (error) {
        res.json(error.raw.message);
    }
}

const success = async (req, res) => {
    const sessionId = req.body;
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    console.log(session);
    const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);
    const email = session.customer_details.email;
}


export { checkout, success};

