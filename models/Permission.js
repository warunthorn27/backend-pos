const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    permission_code:String,
    permission_name:String,
},{timestamps:true})

module.exports = mongoose.model('permission', permissionSchema)