const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uniqe: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        match: /[a-zA-Z]/,
    },
    type: {
        type: String,
        required: true,
        trim: true,        
        match: /drink|food/,
    },
    price: {
        type: Number,
        required: true,
        min: 3
    },
    description: {
        type: String,
        trim: true,
        maxlength: 150,
    },
    image: {
        type: String,
        minlength: 1,
        maxlength: 1000,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('products', productSchema)