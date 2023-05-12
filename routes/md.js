const Joi = require("joi")
const _ = require("lodash")
const express = require("express")
const {createFile,getFileNames,readFile,renameFile, mdFolder,updateFile,deleteFile} = require("../custom_module/custom_fs")
const fs = require("fs")
 
const routes = express.Router()

const schema = Joi.object({
    fileName : Joi.string().min(3).required(),
    content : Joi.string(),
    newName : Joi.string()
  })
  
  
  routes.get("/",async (req,res)=>{
    try{
    const fileNames = await getFileNames();
    res.send(fileNames)
  } 
  catch{
    res.status(404).send({msg:"files Not Found"})
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
       res.status(404).send({msg:"File Not Found"})
       return
      }
    }
    res.status(400).send({msg:"Enter a Valid argument"})
  })
  
  
  routes.post("/api/MD_Files/", async(req,res)=>{
    //checking if the file is present 
    
    const {error} = schema.validate(req.body)
    if(error){
      res.status(400).send(_.pick(error,["message"]));
      return;
    }
    let fileName = req.body.fileName.toLowerCase();
    let isPresent = await isValuePresent(fileName);
     
    if(isPresent){
      res.status(400).send({msg:"File Already Exits"});
      return
    }
        
      try{
       await createFile(fileName);
       
       const { birthtime } = fs.statSync(mdFolder+"/"+fileName)
        
       res.send({fileName:fileName,createdOn:birthtime});
       return;
      }
      catch (err){ 
       res.status(404).send({msg:"Some Issue in creating File"})
       return
      } 



  })


 routes.put("/api/MD_Files/rename",async (req,res)=>{
 
   
  const {error} = schema.validate(req.body)

    if(error||req.body.newName==undefined){
      res.status(400).send({msg:error|| "check the newName in ReqBody"});
      return;
    }
    let fileName = req.body.fileName.toLowerCase();
    let newName = req.body.newName.toLowerCase();
    let isPresent = await isValuePresent(fileName);
    let newNameIsPresent = await isValuePresent(newName) 
    if(newNameIsPresent) { res.status(400).send({msg:`file already exits with name '${newName}' `})
  return
  }
    if(!isPresent){
      res.status(404).send({msg:"File Not Found"})
      return;
    }
    try{
      let result = await renameFile(fileName,newName);
       
      let fileContent = await readFile(newName)
      res.send({fileName:newName,content:fileContent})
    }
    catch (err){
      res.status(500).send({err:err,msg:"Some Issue in creating File"})
    }
 })

  routes.put("/api/MD_Files/",async (req,res)=>{
    
    
    const {error} = schema.validate(req.body)
    if(error  ||req.body.content==undefined  ){
      res.status(400).send({msg: error|| "Check the content In req body"});
      return;
    }
    let fileName = req.body.fileName;
    let content = req.body.content;

    let isPresent = await isValuePresent(fileName);
    
    if(!isPresent){
      res.status(400).send({msg:"File Not Found"})
      return
    } 
    
    try{
      const responseData = await updateFile(fileName,content);
      res.send(req.body);
      return;
     }
     catch{
      res.status(404).send({msg:"Some Issue in Updating File"})
      return
     }
  
  })
  

  routes.delete("/api/MD_Files/", async (req,res)=>{
    let fileName = req.query.fileName;
     
    const {err} = schema.validate(req.body)
    if(!fileName || err){
      res.status(400).send({msg:"Enter a valid Query or Enter A valid FileName"});
      return
    }
    
    let isPresent = await isValuePresent(fileName);

    if(!isPresent){
      res.status(404).send({msg:"File Not Found"})
      return;
    }

    try{
      await deleteFile(fileName)
      res.send({msg:"Deleted"})
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