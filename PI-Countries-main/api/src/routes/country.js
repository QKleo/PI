const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();

router.get('/:name',(req,res,next)=>{
    const {name}=req.params
    Countries.findOne({
       where:{name:`${name}`}
       
       
}).then(result=>{
    res.status(200).json(result)
})
})        

module.exports=router;