// {
//   "name": "proproject1",
//   "version": "1.0.0",
//   "description": "",
//   "keywords": [
//     "javascript",
//     "backend",
//     "chai"
//   ],
//   "license": "ISC",
//   "author": "Abhishek Rawat",
//   "type": "commonjs",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   }
// }
// this was the orignal package.json

// as we know that whenever we change or reload our file or do some changes we need to stop the server 
// and again start the server
// nowadays we solve this problem using the utility nodemon
// what nodemon does - it whenever our file reloads or goes through some changes it saves the file and restarts the server

// We are installing nodemon as a devDependency using npm i -D nodemon because we use nodemon during development to 
// automatically restart the server when files change. We don't normally need it in production 
//  which means it will not be included when production dependencies are installed
// npm i nodemon installs nodemon as a regular dependency, meaning it is treated as a dependency that the 
// application may need when installed for production as well.
// "npm i nodemon makes nodemon a regular dependency, which means it will be included when production dependencies are installed."


    //                 npm install
    //                      │
    //          ┌───────────┴───────────┐
    //          ↓                       ↓
    //    dependencies            devDependencies
    //          │                       │
    //    Needed by app          Needed during development
    //    / production           / testing / building
    //          │                       │
    //  express, mongoose       nodemon, eslint



// heree we have add "types" and in scripts we add "dev command script"

// so now the package.json has become 
// {
//   "name": "proproject1",
//   "version": "1.0.0",
//   "types": "module",
//   "description": "",
//   "keywords": [
//     "javascript",
//     "backend",
//     "chai"
//   ],
//   "license": "ISC",
//   "author": "Abhishek Rawat",
//   "type": "commonjs",
//   "main": "index.js",
//   "scripts": {
//     "dev": "nodemon src/index.js"
//   },
//   "devDependencies": {
//     "nodemon": "^3.1.14"
//   }
// }
// in dev as we add this line ""dev": "nodemon src/index.js"" now whenever we run "npm run dev" the server will automatically 
// saves the file and restarts the server


