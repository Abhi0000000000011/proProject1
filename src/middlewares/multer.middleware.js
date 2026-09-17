// we will be using multer as a middleware although we can create middleware without it but we want multer 
// to use it as a middleware as we know in middleware before reaching somewhere first meet me we want multer to work like that 
// so where ever we have file uploading capabilities we will use multer there 
// like in registeration form we will use multer , login does not need multer so we will not use multer there 
// so this will be a benifitial utility for us 


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
