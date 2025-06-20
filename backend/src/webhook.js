const dotenv = require('dotenv');
const User = require('./models');
const { default: APIResponse } = require('./Response/success');
const { default: APIError } = require('./Response/error');
const { Webhook } = require('svix');
dotenv.config();

const dummyData = {
    "data": {
      "backup_code_enabled": false,
      "banned": false,
      "create_organization_enabled": true,
      "created_at": 1744276393608,
      "delete_self_enabled": true,
      "email_addresses": [
        {
          "created_at": 1744276372355,
          "email_address": "arjav1528@gmail.com",
          "id": "idn_2vX0zQSkP1QJLcwpcWMxR30cnez",
          "linked_to": [],
          "matches_sso_connection": false,
          "object": "email_address",
          "reserved": false,
          "updated_at": 1744276393612,
          "verification": {
            "attempts": 1,
            "expire_at": 1744276972975,
            "status": "verified",
            "strategy": "email_code"
          }
        }
      ],
      "enterprise_accounts": [],
      "external_accounts": [],
      "external_id": null,
      "first_name": null,
      "has_image": false,
      "id": "user_2vX11zP5ojq7cTRY58xT6oJqmRG",
      "image_url": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ydlUzZkJoeDQ3eWVkZHFLaGQ1dGFUYlVZSUQiLCJyaWQiOiJ1c2VyXzJ2WDExelA1b2pxN2NUUlk1OHhUNm9KcW1SRyJ9",
      "last_active_at": 1744276393607,
      "last_name": null,
      "last_sign_in_at": null,
      "legal_accepted_at": null,
      "locked": false,
      "lockout_expires_in_seconds": null,
      "mfa_disabled_at": null,
      "mfa_enabled_at": null,
      "object": "user",
      "passkeys": [],
      "password_enabled": true,
      "phone_numbers": [],
      "primary_email_address_id": "idn_2vX0zQSkP1QJLcwpcWMxR30cnez",
      "primary_phone_number_id": null,
      "primary_web3_wallet_id": null,
      "private_metadata": {},
      "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
      "public_metadata": {},
      "saml_accounts": [],
      "totp_enabled": false,
      "two_factor_enabled": false,
      "unsafe_metadata": {},
      "updated_at": 1744276393626,
      "username": null,
      "verification_attempts_remaining": 100,
      "web3_wallets": []
    },
    "event_attributes": {
      "http_request": {
        "client_ip": "103.225.100.51",
        "user_agent": "okhttp/4.12.0"
      }
    },
    "instance_id": "ins_2vU3fBhx47yeddqKhd5taTbUYID",
    "object": "event",
    "timestamp": 1744276393644,
    "type": "user.created"
  }


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

            if(!user){
                return res.status(200).json(new APIResponse(
                    200,
                    "User not found",
                    "The user with the given email does not exist"
                ));
            }

            user.email = evt.data.email_addresses[0].email_address;
            user.gender = evt.data.gender;
            user.age = evt.data.age;
            user.genres = evt.data.genres;
            user.savedQuotes = evt.data.savedQuotes;

            await user.save();

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