const { emailx } = require("../models/emailmodel");
const { userModel } = require("../models/Usermodel");

const createemail= async(req,res)=>{
       try {
        const userid = req.id
        const{to,message,subject}= req.body;
        if(!to,!message,!subject) return res.status(401).json({messagex:'require all field'})
        const email = await emailx.create({to,message,subject,userId:userid})
        const allEmails = await emailx.find();
        console.log("All emails in DB:", allEmails);
         return res.status(200).json({messgaex:email,success:true})
       } catch (error) {
        return res.status(401).json({message:'error while creating email',success:false})

       }

}
const deleteemail= async(req,res)=>{

    const emailid = req.params.id
    if(!emailid) res.status(401).json({message:' id required',success:"false"})
     
        const email= await emailx.findByIdAndDelete(emailid)
    
      if(!email) res.status(201).json({messgae:"email is not available"})
       return res.status(200).json({message:'email deleted successfully'})

}
const getallemail = async (req, res) => {
  try {
    const emails = await emailx.find(); 

    console.log("All emails found:", emails);

    if (emails.length === 0) {
      return res.status(404).json({ message: "No emails found" });
    }

    return res.status(200).json({ success: true, emails });

  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports={createemail,deleteemail,getallemail}
