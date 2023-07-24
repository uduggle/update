import { Router } from "express";
import { decodetoken } from "../helpers/secure/jwt";
import { createSub,updateSub,getone,getall,deleted} from "../controllers/SubcateController";
const router = Router()

router.post('/new', decodetoken,createSub)
router.put('/update/:subId', decodetoken, updateSub)
router.get('/one/:subId', getone)
router.get('/all', getall)
router.delete('/delete/:subId', deleted)

export default router;





