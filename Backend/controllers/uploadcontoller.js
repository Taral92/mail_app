const path = require('path')
const multer = require('multer')

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
          cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload= multer({storage})

const uploadfile=(req,res)=>{
    console.log("receive file:",req.file);
    console.log("file :" , req.body);
    
    
    if(!req.file) return res.status(501).json({message:"error in uploading"})
    res.status(200).json({
      message:"uploaded successfully",
      file:req.file,
    })
}
module.exports={upload,uploadfile}