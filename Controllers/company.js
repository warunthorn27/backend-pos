const Company = require('../models/Company')

exports.create = async (req,res) => {
        try {
            console.log(req.body)
            const companyed = await new Company(req.body).save();
            res.send(companyed)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
}

exports.read = async (req,res) => {
        try {
            const id = req.params.id
            const companyed = await Company.findOne({_id:id})
            res.send(companyed)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.list = async (req,res) => {
        try {
            const companyed = await Company.find()
            res.send(companyed)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.update = async (req,res) => {
        try {
            const id = req.params.id
            const update_comp = await Company.findOneAndUpdate({_id:id}, req.body,{new:true})
            res.send(update_comp)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}

exports.remove = async (req,res) => {
        try {
            const id = req.params.id
            const remove = await Company.findOneAndDelete({_id:id})
            res.send(remove)
        } catch (error) {
            console.log(err)
            res.status(500).send('Server error')
        }
}