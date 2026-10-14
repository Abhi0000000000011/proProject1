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

// our main focus is to join this subscriptions to our user this is our main task and this is called LEFT JOIN

// When your primary focus is keeping every record from your main entity (like Users) and attaching related data 
// from another collection/table (like Subscriptions)—even if a user doesn't have any subscriptions yet—that is precisely 
// what a LEFT JOIN (or Left Outer Join) does 

// so our major work is that the info i am getting from the subscription join that info with the users this is our 
// overall task 

// and for this we need to study aggregation pipelines 
