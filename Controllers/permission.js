const preminssion = require('../models/Permission')

exports.create = async (req,res) => {
        try {
            console.log(req.body)
            const premissioned = await new preminssion(req.body).save();
            res.send(premissioned)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
}

exports.read = async (req,res) => {
        try {
            const id = req.params.id
            const premissioned = await preminssion.findOne({_id:id})
            res.send(premissioned)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.list = async (req,res) => {
        try {
            const premissioned = await preminssion.find()
            res.send(premissioned)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.update = async (req,res) => {
        try {
            const id = req.params.id
            const update_premis = await preminssion.findOneAndUpdate({_id:id}, req.body,{new:true})
            res.send(update_premis)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.remove = async (req,res) => {
        try {
            const id = req.params.id
            const remove_permis = await preminssion.findOneAndDelete({_id:id})
            res.send(remove_permis)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}