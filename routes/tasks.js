import { Router } from "express"
import * as tasksCtrl from "../controllers/tasks.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', tasksCtrl.index)
router.post('/', isLoggedIn, tasksCtrl.create)
router.get('/:id', isLoggedIn, tasksCtrl.show)
router.patch('/:id/completed', isLoggedIn, tasksCtrl.completed)
router.get('/:id/edit', isLoggedIn, tasksCtrl.edit)
router.put('/:id', isLoggedIn, tasksCtrl.update)
router.delete('/:id', isLoggedIn, tasksCtrl.delete)
router.post('/:id/comments', isLoggedIn, tasksCtrl.createComment)



export {
  router
}