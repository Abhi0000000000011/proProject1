// we will be using multer as a middleware although we can create middleware without it but we want multer 
// to use it as a middleware as we know in middleware before reaching somewhere first meet me we want multer to work like that 
// so where ever we have file uploading capabilities we will use multer there 
// like in registeration form we will use multer , login does not need multer so we will not use multer there 
// so this will be a benifitial utility for us 









// HTML
// <form action="/profile" method="post" enctype="multipart/form-data">
//   <input type="file" name="avatar" />
// </form>
// action="/profile": Tells the browser to send the submitted data to the /profile route on your server.
// method="post": Specifies that this is a POST request (used for sending/creating data).

// enctype="multipart/form-data": Crucial. By default, HTML forms send data as plain text 
// (application/x-www-form-urlencoded). This attribute tells the browser to split the request 
// into "parts" so binary file data can travel safely alongside regular text.

// <input type="file" name="avatar" />: Creates the file picker button. The name="avatar" attribute is extremely 
// important—it is the exact key your server uses to look for the file. 
// name="avatar" attribute acts as the ID tag or label for the file you are uploading


// here is where the avatar comes in cluctch 

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
// here in avatar will be the file that user has uploaded which we are now uploading in the cloudinary

// upload = multer({ dest: 'uploads/' }): Configures Multer to automatically take any incoming files and 
// save them into a folder called uploads/ in your project directory.
// like here in this project we are saving our files in "./public/temp" as we can seee the main code


// upload.single('avatar'): This is the Multer middleware in action. It looks at the incoming request 
// for a file field named avatar (matching the name="avatar" in your HTML form).
// here is where the avatar name we have given to the input in the form comes in clutch as now the user which has 
// uploded a file there in that particular input that particular file will be uploaded in the cloudinary

// It processes that particular file, saves it to the uploads/ or the folder which we have choosen
//  folder, and attaches information about it to req.file.

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
// })
// upload.array('photos', 12): Used when a user uploads multiple files under the same form field name 
// (e.g., an input allowing multiple photo selections).
// as we have given 12 so it will only accept upto 12 files only not more than that 
// here we have used req.files while on single upload we use req.file








// Multiple Fields (Complex Uploads)
// JavaScript
// const uploadMiddleware = upload.fields([
//   { name: 'avatar', maxCount: 1 }, 
// here maxcount is the max number of files a user is allowed to upload for that specific field name.
// we use this upload field so that we can take and handle multiple field name not only one like in upload.array
//   { name: 'gallery', maxCount: 8 }
// ])

// app.post('/cool-profile', uploadMiddleware, function (req, res, next) {
//   // req.files['avatar'][0] -> File this one is a single file at 0 index which is send by user from the avatar 
//   // req.files['gallery'] -> Array this is an array of files which is send by user from the gallery from frontend 
// })
// upload.fields(...): Used when your form has different file inputs (e.g., one 
//   profile picture field named avatar and a separate multi-file input named gallery).

// It creates an object structure under req.files where the keys match your field names, 
// letting you easily access specific files (e.g., accessing the avatar separately from the gallery array).





// Imagine you have an "Edit Profile" page where users can update their bio or username via JavaScript (fetch):

// JavaScript
// // Frontend JavaScript sending text data using FormData
// const formData = new FormData();
// formData.append('username', 'john_doe');
// formData.append('bio', 'Hello world!');

// fetch('/profile', {
//   method: 'POST',
//   body: formData // This forces the request to be 'multipart/form-data'
// });
// Because that frontend code sends multipart/form-data, your backend Express server needs Multer to read req.body.username 
// and req.body.bio. Since no profile picture is being uploaded in this specific request, you use upload.none():

// JavaScript
// app.post('/profile', upload.none(), function (req, res) {
//   // req.body.username will be "john_doe"
//   // req.body.bio will be "Hello world!"
//   res.send('Profile updated successfully!');
// })
// Summary of Multer's main methods for context:
// upload.single('fieldname') = Expects 1 file + text fields.

// upload.array('fieldname') = Expects multiple files under one name + text fields.

// upload.none() = Expects NO files, only text fields (parsed from multipart data).






// What about file extensions? By default, when Multer saves files to the uploads/ folder, it strips away the original
//  file extensions (like .jpg or .png) and saves them as long, randomized strings for security. If you need to keep 
// original extensions or customize filenames, 
// you can configure Multer's diskStorage engine instead of using the simple { dest: 'uploads/' } shorthand.










// n this example, we will create a filter that only allows image files (like .jpg, .png, or .jpeg) and 
// rejects anything else (like a .pdf, .txt, or .exe).

// Example: Uploading Only Images
// JavaScript
// const express = require('express');
// const multer = require('multer');
// const app = express();

// // 1. Define the fileFilter function
// const fileFilter = (req, file, cb) => {
//   // Check the file's mimetype (e.g., 'image/jpeg', 'image/png', 'application/pdf')
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     // Accept the file
//     cb(null, true);
//   } else {
//     // Reject the file and pass a custom error message
//     cb(new Error('Only .jpg and .png images are allowed!'), false);
//   }
// };

// // 2. Pass the fileFilter into the multer configuration
// const upload = multer({ 
//   dest: 'uploads/',
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 2 } // Optional: limit size to 2MB
// });

// // 3. Setup your route
// app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
//   // If we reach here, the file was successfully accepted and saved!
//   res.json({
//     message: 'File uploaded successfully!',
//     file: req.file
//   });
// });

// // 4. Error-handling middleware (Crucial when using fileFilter)
// app.use((err, req, res, next) => {
//   if (err) {
//     // Catch errors thrown by Multer (like fileFilter rejections or file size limits)
//     res.status(400).json({ error: err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
// How fileFilter Works Behind the Scenes:
// file object: Every time a file is uploaded, Multer passes a file object to your fileFilter function. 
// It contains useful properties like:

// file.originalname (e.g., my-dog.png)

// file.mimetype (e.g., image/png — this is the safest way to check file types because users can easily fake 
// file extensions like changing .exe to .jpg, but the mimetype describes the actual file content).

// The Callback cb(error, boolean):

// cb(null, true): Means "No error (null), and accept the file (true)". Multer will proceed to save it.

// cb(null, false): Means "No error, but reject the file (false)". Multer will skip saving this file, but the
// request will continue (though req.file will be undefined).

// cb(new Error('...'), false): Means "An error occurred, stop everything and reject the file". This triggers 
// Express's error-handling middleware (like the app.use((err, req, res, next) => {...}) block shown above).















// frontend see what is happening here 

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Avatar Upload</title>
//     <style>
//         body { font-family: Arial, sans-serif; margin: 50px; }
//         #message { margin-top: 15px; font-weight: bold; }
//     </style>
// </head>
// <body>

//     <h2>Upload Your Avatar</h2>
    
//     <!-- The form handling the file upload -->
//     <form id="uploadForm">
//         <!-- name="avatar" MUST match your backend: upload.single('avatar') -->
//         <input type="file" name="avatar" id="avatarInput" accept="image/png, image/jpeg" required />
//         <button type="submit">Upload Avatar</button>
//     </form>

//     <!-- Area to display success or error messages -->
//     <div id="message"></div>

//     <script>
//         const form = document.getElementById('uploadForm');
//         const messageDiv = document.getElementById('message');

//         form.addEventListener('submit', async (e) => {
//             e.preventDefault(); // Prevent page reload

//             // FormData automatically packages the file and input fields
//             const formData = new FormData(form);

//             try {
//                 // Send the POST request to your backend route '/upload-avatar'
//                 const response = await fetch('/upload-avatar', {
//                     method: 'POST',
//                     body: formData // Automatically sets multipart/form-data
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     messageDiv.style.color = 'green';
//                     messageDiv.innerText = `Success: ${data.message} (File: ${data.file.originalname})`;
//                 } else {
//                     // This catches the error thrown by your fileFilter or limits!
//                     messageDiv.style.color = 'red';
//                     messageDiv.innerText = `Error: ${data.error}`;
//                 }
//             } catch (err) {
//                 messageDiv.style.color = 'red';
//                 messageDiv.innerText = 'Something went wrong with the upload request.';
//             }
//         });
//     </script>

// </body>
// </html>

// backend

// const express = require('express');
// const multer = require('multer');
// const path = require('path'); // Node.js built-in path module
// const app = express();

// // 👉 SERVE STATIC FILES (This lets Express open your index.html)
// app.use(express.static(path.join(__dirname)));

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .jpg and .png images are allowed!'), false);
//   }
// };

// const upload = multer({ 
//   dest: 'uploads/',
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 2 } // 2MB limit
// });

// app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
//   res.json({
//     message: 'File uploaded successfully!',
//     file: req.file
//   });
// });

// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });




















import multer from "multer"

// we will bw saving our file in the local storage the file that is given by the user weathre it is a image or a video
// or a pdf anything so we store in DiskStorage not in memory storage bcz memory storage can be filled if there is a large 
// file so we use disk dtorage to save file temporarly



const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // req is what coming from the user ie the user data which comes in json format 
    // file is only feature of multer this file contains all the files user is uploading 
    // this is why we use multer or this file feature bcz we have configured json data in the express which is comming from 
    // the user req but not files for which we use multer
    // this cb is callback
    // cb(null, '/tmp/my-uploads')
    // here in callback its first parameter is nulll and its second parameter is '/tmp/my-uploads' tis is the
    // destination folder where we will be putting all our files coming from the user 
    // but  here we will be putting the files in "./public/temp" as we have created it we know in the starting for this purpose
    // only 
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) { // setting up file name 
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, file.fieldname + '-' + raw.toString('hex')) // this is the else case
    console.log(file); // just to see whats inside the file 
    })
  }
})

export const upload = multer({ storage: storage })































// here we are again without comments 

// import multer from "multer"


// const crypto = require('crypto')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, './public/temp');
//   },
//   filename: function (req, file, cb) { 
//     crypto.randomBytes(16, function (err, raw) {
//       if (err) return cb(err)
//       cb(null, file.fieldname + '-' + raw.toString('hex')) 
//     console.log(file); 
//     })
//   }
// })

// export const upload = multer({ storage: storage })










// see multer documentation 