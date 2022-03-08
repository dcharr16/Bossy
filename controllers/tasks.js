import { Task } from "../models/task.js"

function index(req, res){
  Task.find({})
  .then(tasks => {
    res.render('tasks/index', {
      tasks, 
      description:"tasked",
      user: req.user ? req.user: null,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })
}

export {
   index
}