const Stripe = require('stripe')

const dotenv = require('dotenv');
dotenv.config()

const User = require('../models/user')
const Song = require('../models/Song');
const TryCatch = require('../utlis/tryCatch');


const stripe = new Stripe(

process.env.STRIPE_SECRET_KEY

);

exports.createSubscription = TryCatch(async(req , res)=>{

        const session = await stripe.checkout.sessions.create({

        mode : "subscription" ,

        payment_method_types : ["card"] , 

        line_items:[
            {

                price:process.env.STRIPE_PRICE_ID,
                
                quantity : 1

            }
        ],

        success_url : "http://localhost:5173/success",

        cancel_url : "http://localhost:5173/cancel" ,

        client_reference_id: req.user._id.toString(),

        })

        res.json({ url : session.url})
});
exports.stripeWebhook = async (req, res) => {

    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {

        const session = event.data.object;
        const userId = session.client_reference_id;

        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        await User.findByIdAndUpdate(userId, {
            isPremium: true,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription
        });
    }

    res.json({ received: true });
};

exports.getPremiumSongs =async(req , res)=>{


    try{

        const songs = await Song.find({

            premium : true

        })

        res.status(200).json({

                success : true ,

                songs

        })

    }catch(error){

            res.status(500).json({

                success : false ,

                message : error.message

            })
    }
}


