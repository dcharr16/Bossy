import { Router } from "express"
import * as tasksCtrl from "../controllers/tasks.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', tasksCtrl.index)
router.post('/', isLoggedIn, tasksCtrl.create)
router.get('/:id', isLoggedIn, tasksCtrl.show)
router.patch('/:id/completed', isLoggedIn, tasksCtrl.completed )
// router.get('/new',tasksCtrl.new)

export {
  router
}