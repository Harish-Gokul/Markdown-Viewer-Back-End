# Mongo DB -  Documentary Database

## Node js mongodb Intergration

* **Step 1** - `Require` Mongodb
* **Step 2** -  connect to mongodb with dbname
* **Step 3** -  Create a schema
* **Step 4** - Create a mode  
```javascript
 mongoose.model(CollectionName,Schema) 
```  

## Connecting to mongoDb `npm i mongoose`
```javascript
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/booksDb")
.then(()=> console.log("Db Connected"))
.catch((err)=>console.log(err))
```

## Keywords in mongodb
- __Schema__ is used to define the shape of the document .
- __model__  - A Mongoose model is a wrapper on the Mongoose schema. Mongoose model provides an interface to the database for creating, querying, updating, deleting records.
- __Collection__ in mongodb is like table in SQL db
- __Document__ in mongodb is similar to row in SQL db
    - contains Key value pair 
## Creating Schema 
we can create a schema by `new mongoose.Schema({})` , we have to pass the object in schema constructer
```javascript
const bookscollections = new mongoose.Schema({
    name :{type:String, require :true},
    author :{type:String},
    publisher:String,
    publishedOn :Date,
    rating:Number,
    isPublished:Boolean
})
```
### Avilable Schema DataTypes
- String
- Number
- Date
- Buffer - BinaryData
- Boolean 
- isObjectIdOrHexString
- Array - to Store array of Strings we use `[String]`

## Creating model in mongodb
```Javascript
const BooksCollections = mongoose.model("bookscollections",bookSchema)
```
Here This `mongoose.model(collectionName,Schema)` will return a Class - Through this class we can create multiple object/document in db

## Creating document 
```javascript
const book = new BooksCollections({
    name:"only time will tell",
    author:"Jerfey Archer",
    publisher:"Indian publisher",
    rating:10,
    isPublished:True
})
```
By the above code we have created a book object by  `BooksCollections` Class which is returned from `mongoose.model()`

## Saving the Document
The Object we created `book` has save() function it returns a `promise` 
    - The Data/Document will be stored in mongodb 

```javascript
async function saveDocument(){
    let result = await book.save()
    console.log(result)
}
saveDocument()
```
# Mongoose Validation
- where have already seen  a validator `Joi` . Joi is used to validate the req.body. 
- Mongoose has in bulid validator. it ensure how the data should be stored in db is in right shape
```javascript
const bookSchema = new mongoose.Schema({
    name :{type:String, required :true},
    author :{type:String},
    publisher:String,
    publishedOn :Date,
    rating:Number,
    isPublished:Boolean
})
```

### Build in Validators
when we want to set a required parameter based on condition, we can do this by bulid in validators 
```javascript
   price :{
        type:Number,
        required : function (){return this.isPublished}
    }
```
Here in the above snippet we cannot replace function with arrow function because they don't have their own `this` . so inside class or inside constructor we should not use arror function 

### Additional Properties
To Validate string we have many properites such as
 ```javascript
    name :{
        type:String,
        required :true,
        minlength :5,
        maxlength :35,
        match : /regx/
    },
```

### enum
we can force to select any one the the predefiend category
> ### Example
```javascript
   category :{
        type : String,
        required: true
        enum : ["love","thriler"]
    }
```
we have to selecte any one of the category otherwise it will through an error 

## custom Validator
we have `validate` property which is used to set a specific condition for nested objects 
>For Example
> User has to specify at least one for the tag - tags : ["Forntend"]
> if he voliate the condition then we have to throw an error,  In this case we can use custom validator

`validate` property we have to give the `object` as a value
inside the object we have a property called `validator` :  we pass a function which reutrn true/ false
we have another propety called `message` :  "error message" 


```javascript
//tags : ["forntend"]
 tags :{
        type: Array,
        validate :{
            validator : function(v){ return v.length > 1},
            message : "Should have atlease 1 value"
        }
    },
```

## Sync validator to async validator
in some case we may required to fetch data from another db/api in order to validate, In this case we use async Validator
```javascript
  tags :{
        type: Array,
        validate :{
            isAsync : true,
            validator : function (v,callback){
                setTimeout(()=>{
                    let result  = v && v.length > 0
                    console.log(result)
                    callback(result)
                },4000)
                },
            message : "Should have atlease 1 value"
        }
    },
```

### Handling Multiple Validation 
```javascript 
    try {
        let result = await book.save()
        console.log(result)
    }
    catch (ex){
        for( field in ex.errors){
            console.log(ex.errors[field].message)
        }
    }
```
## SchemaType Options
For we have multiple property like

### Options for String
```javascript
name :{
type : String ,
required : true ,
minlength : 3 ,// it will throw exemption if input string length is less the 3
maxlength : 6, // it will thow exemption if the input string legnth is more than 6
lowercase : true, // it will convert the input to lower case
uppercase : true // it will convert the input to upper case
}
```

### Options for Number
```javascript
price :{
type : Number,
min : 4 ,
max : 10,
get : value =>{Math.round(value)},
set : value => {Math.round(value)},
}
```
`get` property has function as value, 
Let's assume in compass the price is stored as 15.8 
When we query the document get function will come into the picture and returns rounded number as 16

`Set` property has function as value,
when we save our object, let's assume we pass the price to 17.8 then set function will round off to 18 and the data will be saved in db

