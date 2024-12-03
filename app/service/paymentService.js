import Stripe from 'stripe';
import OrderDetail from '../models/OrderDetail.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Address from '../models/Address.js';
import Product from '../models/Product.js';
import { sendMailPaymentSuccess } from '../utils/mailSender.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const checkout = async (req, res) => {
    try {
        const { items, email } = req.body;
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

        const sessionParams = {
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
            metadata: {
                items: JSON.stringify(items),
            }
        };

        if (email) {
            sessionParams.customer_email = email;
        }

        const payment = await stripe.checkout.sessions.create(sessionParams);

        res.json({
            url: payment.url,
        });
    } catch (error) {
        res.json(error.raw.message);
    }
}

const success = async (req, res) => {
    const sessionId = req.query.session_id;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const email = session.customer_details.email;
        const name = session.customer_details.name;
        const street_address = session.shipping_details.address.line1;
        const city = session.shipping_details.address.city;
        const state_province = session.shipping_details.address.state;
        const postal_code = session.shipping_details.address.postal_code;
        const country = session.shipping_details.address.country;
        const total = session.amount_total / 100;
        const items = JSON.parse(session.metadata.items);
        const date = new Date(session.created * 1000);
        const formattedDate = date.toLocaleDateString('en-GB'); // Formato DD/MM/YYYY
        const NoPedido = Math.floor(100000 + Math.random() * 900000);

        await sendMailPaymentSuccess(email, 'Compra exitosa', 'Compra exitosa', NoPedido, formattedDate, name, street_address, city, postal_code, total);

        let userId = null;
        const user = await User.findOne({ where: { email } });
        if (user) {
            userId = user.user_id;
            await Address.create({
                user_id: userId,
                street_address,
                city,
                state_province,
                postal_code,
                country
            });

            let deliveryAddressId = null;
            const address = await Address.findOne({ where: { user_id: userId } });
            if (address) {
                deliveryAddressId = address.id;
            };

            const newOrder = await Order.create({
                user_id: userId,
                status: 'completada',
                total,
                deliveryAddressId
            })

            for (const item of items) {
                const product = await Product.findOne({ where: { name: item.name } });
                await OrderDetail.create({
                    order_id: newOrder.order_id,
                    product_id: product.product_id,
                    quantity: item.quantity,
                    unit_price: item.price
                });
            }
        };
        res.json({ message: 'Pago exitoso' });

    } catch (error) {
        console.error(error);
    }
};



export { checkout, success };

