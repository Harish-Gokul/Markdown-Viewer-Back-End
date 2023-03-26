const Joi = require("joi")
const express = require("express")
const {createFile,getFileNames,readFile, mdFolder,updateFile,deleteFile} = require("../custom_module/custom_fs")
const routes = express.Router()

const schema = Joi.object({
    fileName : Joi.string().min(3).required()
  })
  
  
  routes.get("/",async (req,res)=>{
    try{
    const fileNames = await getFileNames();
    res.send(fileNames)
  } 
  catch{
    res.status(404).send("files Not Found")
  }
  }) 


  
  routes.get("/api/MD_Files/",async (req,res)=>{
    let fileName = req.query.fileName;
    if(fileName){
      try{
       const data = await readFile(fileName)
       res.send({fileName:req.query.fileName,content:data});
       return;
      }
      catch{
       res.status(404).send("File Not Found")
       return
      }
    }
    res.status(400).send("Enter a Valid argument")
  })
  
  
  routes.post("/api/MD_Files/", async(req,res)=>{
    //checking if the file is present 
    
    const {err} = schema.validate(req.body)
    if(err || req.body.fileName==undefined){
      res.status(400).send(err|| "Chek the key");
      return;
    }
    let fileName = req.body.fileName.toLowerCase();

    let isPresent = await isValuePresent(fileName);
    
    if(isPresent){
      res.status(400).send("File Already Exits");
      return
    }
        
      try{
       const responseData = await createFile(fileName);
       res.send({fileName:req.body.fileName});
       return;
      }
      catch{
       res.status(404).send("Some Issue in creating File")
       return
      }
   
    res.status(400).send("Ombu tha");



  })
  routes.put("/api/MD_Files/",async (req,res)=>{
    
  
    const {err} = schema.validate(req.body)
    if(err || req.body.fileName==undefined ||req.body.content==undefined  ){
      res.status(400).send(err|| "Chek the fileName or content");
      return;
    }
    let fileName = req.body.fileName;
    let content = req.body.content;

    let isPresent = await isValuePresent(fileName);
    
    if(!isPresent){
      res.status(400).send("File Not Found")
      return
    } 
    
    try{
      const responseData = await updateFile(fileName,content);
      res.send(req.body);
      return;
     }
     catch{
      res.status(404).send("Some Issue in Updating File")
      return
     }
  
  })
  

  routes.delete("/api/MD_Files/", async (req,res)=>{
    let fileName = req.query.fileName;
     
    const {err} = schema.validate(req.body)
    if(!fileName || err){
      res.status(400).send("Enter a valid Query or Enter A valid FileName");
      return
    }
    
    let isPresent = await isValuePresent(fileName);

    if(!isPresent){
      res.status(404).send("File Not Found")
      return;
    }

    try{
      await deleteFile(fileName)
      res.send("Deleted")
    }
    catch{
      res.status(400).send(err)
      console.log(err)
    }

 
  
  })
 
  async function isValuePresent(fileName){
    const fileList = await getFileNames();
    for(let i =0;i<fileList.length;i++){
      if(fileList[i].fileName == fileName.toLowerCase()){
        return true;
      }
    } 
    return false;
  }

  
   
module.exports = routes;