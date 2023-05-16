# Backend for Notes via Markdown application

It a simple notes application with a markdown syntax and it's inspired from `Github Readme.md`. This node application reads the Markdown Files from a directory  displays them in the web app.

You can Check out front-end by [Clicking here](https://github.com/Harish-Gokul/Markdown-Viewer-FrontEnd)

### To start The server 
```bash
npm i 
node index.js
```
I have not included node_module folder, so `npm i` can install all the dependencies that i have used in my project 
`node index.js` will start the server in port 3000

Software Required
   - Node js  
   - postman (To Test our Api)

<hr>

## Api Usage

#### To Get all the files 

**Method** - `GET`  
**URL** - [http://localhost:3000/](http://localhost:3000/)
```javascrip
//Response Body
[
    {
        "fileName": "java brushup.md",
        "createdOn": "2023-04-15T05:32:52.618Z"
    },
   {
        "fileName": "mongodb.md",
        "createdOn": "2023-04-15T05:32:52.634Z"
    }
]
```
<hr>

#### To Get a single file

**Method** - `GET`  
**URL** - [http://localhost:3000/api/MD_Files/?fileName=mongodb.md](http://localhost:3000/api/MD_Files/?fileName=mongodb.md)
```javascript
//Response body 
{
    "fileName": "mongodb.md",
    "content": "# Mongo DB -  Documentary Database\n\n## Node js mongodb Intergration\n\n* **Step 1** - `Require` Mongodb\n* **Step 2** -  connect to mongodb with dbname\n* **Step 3** -  Create a schema\n* **Step 4** - Create a mode  \n```javascript\n mongoose.model(CollectionName,Schema) \n```  \n\n## Connecting to mongoDb `npm i mongoose`\n```javascript\nconst mongoose = require(\"mongoose\")\nmongoose.connect(\"mongodb://localhost/booksDb\")\n.then(()=> console.log(\"Db Connected\"))\n.catch((err)=>console.log(err))\n```\n\n## Keywords in mongodb\n- __Schema__ is used to define the shape of the document"
}
```
<hr>

### Create a new file
**Method** - `POST`  
**URL** - [http://localhost:3000/api/MD_Files/](http://localhost:3000/api/MD_Files/)
```javascript
//request Body
{
    "fileName":"sample1.md"
}
//Response body
{
    "fileName": "sample1.md",
    "createdOn": "2023-05-12T09:52:14.139Z"
}
```

<hr>

### To update a file
**Method** - `PUT`  
**URL** - [http://localhost:3000/api/MD_Files/](http://localhost:3000/api/MD_Files/)
```javascript
//Request Body
{
    "fileName":"sample1.md",
    "content" : "#Hello"
}

//Response body
{
    "fileName":"sample1.md",
    "content" : "#Hello"
}
```
<hr>

### To rename a file

**Method** - `PUT`  
**URL** - [http://localhost:3000/api/MD_Files/rename](http://localhost:3000/api/MD_Files/rename)
```javascript
//Request Body
{
    "fileName":"sample1.md",
    "newName" : "sample2.md"
}

//Response body
{
    "fileName": "sample2.md",
    "content": "Hello"
}
```
<hr>

### To delete a file

**Method** - `DELETE`  
**URL** - [http://localhost:3000/api/MD_Files/?fileName=sample2.md](http://localhost:3000/api/MD_Files/?fileName=sample2.md)
```javascript
//response body
{
    "msg": "Deleted"
}
```
