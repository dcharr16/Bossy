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

function edit(req, res) {
  Task.findById(req.params.id)
  .then(task => {
    res.render("tasks/edit", {
      task,
      description: "edit",
      user: req.user ? req.user: null,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tasks")
  })
}

function update(req, res) {
  Task.findById(req.params.id)
  .then(task => {
    if (task.owner.equals(req.user.profile._id)) {
      req.body.description
      task.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/tasks/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect(`/tasks`)
  })
}
function deleteTask(req, res){
  Task.findById(req.params.id)
  .then (task => {
    if(task.owner.equals(req.user.profile._id)) {
      task.delete()
      .then (()=> {
      res.redirect('/tasks')
    })
  } else {
    throw new Error ("NOT AUTHORIZED")
  }
})
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/tasks")
  })
}

function createComment(req, res) {
  Task.findById(req.params.id, function (err, task) {
    task.comments.push(req.body)
    task.save(function(err){
      res.redirect(`/tasks/${task._id}`)
    })
  })
  
}



export {
   index,
   create,
   show,
   completed,
   edit,
   update,
   deleteTask as delete,
   createComment,
}