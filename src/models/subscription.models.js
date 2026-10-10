// this subscription is not the subscription i am thinking it is the one subscribed and unsubscribed one 


import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({

    // subscriber will be the user which has subscribed to a user channel
    subscriber: { // one who is subscribing 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: {// the subscribed channel by the subsccriber
        type: Schema.Types.ObjectId,
        ref: "User"
    },


}, {timestamps: true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);