import { Task } from "../models/task.js"

function index(req, res){
  Task.find({})
  .then(tasks => {
    res.render('tasks/index', {
      tasks, 
      description: "assigned task",
      user: req.user ? req.user: null,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Task.create(req.body)
  .then(task => {
    res.redirect('/tasks')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })

}

function show(req,res) {
  Task.findById
}

export {
   index,
   create,
   show,
  

}