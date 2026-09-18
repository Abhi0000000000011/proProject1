// Local storage usually means storage on the same machine where your backend is running—for example, 
// files saved in a folder such as uploads/image.jpg.

// Local server means the computer/environment running your backend application. It could be your laptop during development, 
// or a cloud VM/container in production.















// in this file our simple goal is that we will be getting our files trough the file system  means the files 
// are already uploaded in the local server and we will be sending them to cloud        inary 










import { v2 as cloudinary } from 'cloudinary';
// we dont use v2 as a keyword in our code so we change it to cloudinary

import fs from "fs"
// this fs is file system which is by default available in our nodejs package 
// how our file system works = in our file system there are files linked and unlinked so when we delete a ffile that file
// gets unlinked with the system so now we know how to remove a file using the unlink method


// // Configuration
// cloudinary.config({ 
//     cloud_name: 'xwxeim0j', 
//     api_key: '341648484936938', 
//     api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
// });
// this is what we bring  from the cloudinary
    

// Configuration of cloudinary
// which give us permission to upload files in cloudinary 
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
    



// creating a method to upload file in cloudinary and unlinking the file from our local storage and server 

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)
        {
            console.log("Could not find the file path !!!");
            return;
        }
        // uploading file 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
            // now it will auto detect which type of file user has given and we are uploading 
        });
        // we can also further describe our file here in upload like weather it is a png or a video or a svg or something else
        // now here file has been uploaded successfully 
        console.log(response);
        return response;
        // returning response as now user can take anything what it wants as the response has all the data about the file 
        // its url size etc btw most imp is url and other are just nothing but still 
    } catch (error) {
        // if we catch error here we know that the file is uploaded in our local server sso the main problem is 
        // here when we are uploading it to the cloudinary so means that file is what causing error so 
        // we should remove it from the server bcz it is causing problem for us 
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation failed
        return null;

    }
}


export {uploadOnCloudinary}


















// here we are again with no comments code 

// import { v2 as cloudinary } from 'cloudinary';

// import fs from "fs"

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
// });
    




// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if(!localFilePath)
//         {
//             console.log("Could not find the file path !!!");
//             return;
//         }
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         });
//         console.log(response);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return null;

//     }
// }


// export {uploadOnCloudinary}