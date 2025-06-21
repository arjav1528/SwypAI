const dotenv = require('dotenv');
const User = require('./models');
const APIResponse = require('./Response/success');
const APIError = require('./Response/error');
const { Webhook } = require('svix');
dotenv.config();




const webhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        return res.status(400).json({ message: "WEBHOOK_SECRET is not set" });
    }

    const headerPayload = req.headers;
    const svix_id = headerPayload["svix-id"];
    const svix_signature = headerPayload["svix-signature"];
    const svix_timestamp = headerPayload["svix-timestamp"];

    if(!svix_id || !svix_signature || !svix_timestamp){
        return res.status(400).json(new APIError(
            400,
            "Missing required webhook headers",
            ["One or more required Svix headers are missing"],
            "Please ensure all required webhook headers (svix-id, svix-signature, svix-timestamp) are included"
        ));
    }

    const payload = req.body;

    const body = JSON.stringify(payload);
    
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;


    try{
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-signature": svix_signature,
            "svix-timestamp": svix_timestamp
        }, {
            tolerance: 3600 // Add time tolerance to fix previous error
        })    
        if(!evt) {
            return res.status(400).json(new APIError(
                400, 
                "Invalid webhook payload", 
                ["The webhook signature verification failed"], 
                "The request could not be verified as coming from the expected webhook source"
            ));
        }

        const { type, data } = evt;
        
        if(type === "user.created"){

            const clerkId = evt.data.id;
            const email = evt.data.email_addresses[0].email_address;

            const user = await User.findOne({ clerkId });

            if(user){
                return res.status(200).json(new APIResponse(
                    200,
                    "User already exists",
                    "The user with the given email already exists"
                ));
            }

            const newUser = await User.create({
                clerkId,
                email: data.email_addresses[0].email_address,
            })

            return res.status(200).json(new APIResponse(
                200,
                "User created successfully",
                "The user has been created successfully"
            ));
        }else if(type === "user.updated"){
            const clerkId = evt.data.id;

            const user = await User.findOne({ clerkId });
            const email = evt.data.email_addresses[0].email_address;
            const gender = evt.data.unsafe_metadata.gender;
            const age = evt.data.unsafe_metadata.age;
            const preferGenres = evt.data.unsafe_metadata.preferpreferGenres;
            const savedQuotes = evt.data.unsafe_metadata.savedQuotes;

            if(user){
                user.email = email;
                user.gender = gender;
                user.age = age;
                user.preferGenres = preferGenres;
                user.savedQuotes = savedQuotes;
                await user.save();
            }

            if(!user){
                return res.status(200).json(new APIResponse(
                    200,
                    "User not found",
                    "The user with the given email does not exist"
                ));
            }

            

            return res.status(200).json(new APIResponse(
                200,
                "User updated successfully",
                "The user has been updated successfully"
            ));
        }

        return res.status(200).json(new APIResponse(
            200,
            "Webhook received successfully",
            "The webhook has been received successfully"
        ));


    }catch(error){
        console.log(error);
        return res.status(500).json(new APIError(
            500,
            "Internal server error",
            ["An error occurred while processing the webhook"],
            error.stack
        ));
    }
    
  }

  module.exports = webhook;