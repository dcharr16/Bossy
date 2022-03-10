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
  req.body.completed = false
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

function show(req, res) {
  Task.findById(req.params.id)
  .populate ("owner")
  .populate ("author")
  .then (task => {
    console.log(task)
    res.render('tasks/show', {
      task,
      description:" testing testing 123",
      
    })
  })

  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })
}

function completed(req, res){
  console.log("COMPLETED!!!!");
  console.log(Task);
  console.log(req.params.id);
  Task.findById(req.params.id)
  .then(task => {
    console.log(task._id);
    task.completed = !task.completed
    task.save()
    .then(() => {
      res.redirect(`/tasks/${task._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })

}
export {
   index,
   create,
   show,
   completed,
  

}