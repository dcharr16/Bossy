import mongoose from 'mongoose'
const Schema = mongoose.Schema

const taskSchema= new mongoose.Schema({
  description: {type: String},
  completed: {type: Boolean},
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
})

const Task = mongoose.model('Task', taskSchema)

export{
  Task
}