import { router } from "express"
import * as tasksCtrl from "../controllers/tasks.js"

const router = Router()

router.get('/', tasksCtrl.index)

export {
  router
}