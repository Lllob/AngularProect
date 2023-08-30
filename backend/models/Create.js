const { Schema, model, Types: { ObjectId } } = require('mongoose');

const createSchema = new Schema({
   title: { type: String, required: true, minlength: [2, 'Title must be at least 2 character long'] },
   imageUrl: { type: String,  required: [true, 'Image url is required'], validate: [/^https?:\/\//i, 'Image must be a valid URL'] },
   description: { type: String, required: true, minlength: [4, 'Description must be at least 4 character long'] },
   price: { type: String, required: true, min: [2, 'Price must be at least 2'], validate: [/\d+/, 'Price must be a number'] },
   type: { type: String, required: true, enum: ["Apartment", "Double room", "Single room", "Other"] },
   owner: { type: ObjectId, ref: 'User' },
   boughtBy: { type: [ObjectId], ref: 'User', default: [] }, 
   likes: { type: [ObjectId], ref: 'User', default: [] }
});


const Create = model('Create', createSchema)
Create.createIndexes(); 
               
module.exports = Create; 
