
module.exports = (req,res,next)=>{
 const allowed=['image/jpeg','image/png','image/webp'];
 if(req.files){
   for(const key of Object.keys(req.files)){
     const f=req.files[key];
     if(!allowed.includes(f.mimetype)){
       return res.status(400).json({message:'Invalid file type'});
     }
   }
 }
 next();
};
