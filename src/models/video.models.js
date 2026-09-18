


// we will also be using aggrigation pipelining ie aggrigation queries in this project which on its own a huge topic to learn
// using this dependency 
// npm i mongoose-aggregate-paginate-v2
// and using this is this file only 

// using this is very easy 
// 1. is to import it 
// 2. using it before exporting this file model or Schema




import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({

    videoFile: {
        type: String, // from cloudinary ul
        required: true,
        unique: true,
    },

    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        uniqure: true,
        required: true,
    },

    title: {
        type: String,
        required: [true, "Title is required"],
    },

    description: {
        type: String,
        required: [true, "Description is required"],
    },

    duration: {
        type: Number, // from cloudinary
        required: true,
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


// mongoose give us freedom to  add our ownn plugin's like here 
videoSchema.plugin(mongooseAggregatePaginate);
// now we can write queries which are aggrigation queries 
// regular queries are diff we can write it without using this b&b(bhang Bh*sda) 
// but this aggregationn pipeline by mongoose is what making this project unique 

export const Video = mongoose.model("Video", videoSchema); // this makes model from the Schema videoSChema 











// // using without any comments here we are 



// import mongoose, {Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// const videoSchema = new Schema({

//     videoFile: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     thumbnail: {
//         type: String,
//         required: [true, "Thumbnail is required"],
//     },

//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         uniqure: true,
//         required: true,
//     },

//     title: {
//         type: String,
//         required: [true, "Title is required"],
//     },

//     description: {
//         type: String,
//         required: [true, "Description is required"],
//     },

//     duration: {
//         type: Number,
//         required: true,
//     },

//     views: {
//         type: Number,
//         default: 0
//     },

//     isPublished: {
//         type: Boolean,
//         default: false
//     }

// }, {timestamps: true});

// videoSchema.plugin(mongooseAggregatePaginate);

// export const Video = mongoose.model("Video", videoSchema);