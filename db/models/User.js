const mongoose = require('mongoose')
const { Schema } = mongoose
const db = require('../connect')
const autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db)

const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            require: true,
        },
        name: { type: String, require: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
)

UserSchema.plugin(autoIncrement.plugin, 'User')

const User = db.model('User', UserSchema)

module.exports = User
