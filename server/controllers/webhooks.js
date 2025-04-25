import { Webhook } from "svix";
import User from "../models/user.js";

//API controller Function to manage Clerk User with Database

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhooks(process.env.CLERK_WEBHOOKS_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      svix_id: req.headers["svix-id"],
      svix_timestamp: req.headers["svix-timestamp"],
      svix_signature: req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (key) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
