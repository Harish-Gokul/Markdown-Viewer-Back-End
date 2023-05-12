const fs = require("fs")
const path=require('path');


let oneStepBack= path.join(__dirname,'../');
const mdFolder = `${oneStepBack}/MD_Files`;


function createFile(fileName){
  const target = mdFolder+"/"+fileName;
  const promise = new Promise((resolve,reject)=>{
    fs.writeFile(target,"",(err,files)=>{
      if(err){
      reject(err)
      return}
      resolve(files)
    })
  })
  return promise
}

 
function updateFile(fileName,content){
  const target = mdFolder+"/"+fileName;
   
  const promise = new Promise((resolve,reject)=>{
    fs.writeFile(target,content,(err,files)=>{
      if(err){
      reject(err)
      return}
      resolve("working fine")
    })
  })
  return promise

}

function getFileNames() {
  const promise = new Promise((resolve,reject)=>{
    fs.readdir(mdFolder,(err,files)=>{
      if(err){
        reject(err);
        return;
      }
      let filesObjs = []
      for(let i =0;i< files.length;i++){
        const { birthtime } = fs.statSync(mdFolder+"/"+files[i])
        filesObjs.push({fileName:files[i],createdOn:birthtime})
      }
      resolve(filesObjs)
    })
  })
  return promise
} 
 

function readFile(fileName){
  const promise = new Promise((resolve,reject)=>{
    fs.readFile(`${mdFolder}/${fileName}`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  })
  return promise;
}

function renameFile(fileName,newName){
  const promise = new Promise((resolve,reject)=>{
    fs.rename(`${mdFolder}/${fileName}`, `${mdFolder}/${newName}`,(err,file)=>{
      if(err) return reject(err);
       
      resolve(newName)
    })
  })
  return promise;
}
 

 
function deleteFile(fileName){
  const target = mdFolder+"/"+fileName;
  const promise = new Promise((resolve,reject)=>{
    fs.unlink(target,(err)=>{
      if(err) return reject(err)
      resolve("Deleted Successfully")

    })
  })
  return promise
}

module.exports.createFile = createFile;
module.exports.getFileNames =getFileNames;
module.exports.readFile = readFile;
module.exports.updateFile = updateFile;
module.exports.deleteFile = deleteFile;
module.exports.renameFile = renameFile
module.exports.mdFolder =mdFolder;