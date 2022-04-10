const { Router } = require('express');

const {Temperaments,Dogs}=require('../db.js')

const router=Router()

router.get('/',(req,res,next)=>{

    Temperaments.findAll({
        attributes:['name','id'],
        include:[Dogs]
    })
    .then((r)=>{
        return res.send(r)
    })
    .catch(e =>{console.log(e)})

})

router.get('/:dogs',(req,res,next)=>{
    const {dogs}=req.params
    Temperaments.findAll({
        attributes:['name','id'],
        include:[{
            model:Dogs,
            where:{name:dogs}
        }]
    })
    .then((r)=>{
        return res.send(r)
    })
    .catch(err=>console.log(err))
})





module.exports=router