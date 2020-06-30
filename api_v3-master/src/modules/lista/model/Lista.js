import { createId } from "../../../util";

const Mongoose = require("mongoose");

const Schema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  title: String,
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

createId(Schema);

export default ({
  db,
  master
}) => {

  return db.model('Lista', Schema);
};