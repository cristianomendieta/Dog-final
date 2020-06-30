import { createId } from "../../../util";

const Mongoose = require("mongoose");

const Schema = new Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    name: String,
    id: String,
    birthday: String,
    weight: Number,
    breed: String,
    gender: Number,
    castrated: Number,
    photo: String
    
    
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

createId(Schema);

export default ({
    db,
    master
}) => {

    return db.model('Dog', Schema);
};