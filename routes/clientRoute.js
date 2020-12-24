const clientModel = require('../models/client')
const clientRoute = require('express').Router()

clientRoute.get('/get-all',async(req, res)=>{
    await clientModel.find()
    .then(clients=>{
        return res.status(200).json(clients)
    })
    .catch(err=>{
        res.json(err)
    })
})
clientRoute.post('/create', async (req, res) => {
    let  existing =await clientModel.findOne({email:req.body.email})
    if(existing){
        return res.status(400).json({message:"User existing with this email  !!"})
    }
    await new clientModel(req.body).save()
        .then(doc => {
            return res.json(doc)
        })
        .catch(err => {
            res.status(400).json({ err })
        })
})
clientRoute.post('/update/:id',async(req,res)=>{
    await clientModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    .then(updated=>{
        res.json(updated)
    })
    .catch(err=>{
        res.json(err)
    })
})
clientRoute.get('/delete/:id',async(req,res)=>{
    await clientModel.findOneAndDelete({_id:req.params.id})
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(err=>{
        res.json(err)
    })
})


module.exports = clientRoute