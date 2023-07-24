import { Router } from "express";
import { getone,updatecat, getall, create } from "../controllers/category";
import { decodetoken } from "../helpers/secure/jwt";
const router = Router();

router.put('/update/:catId', updatecat)
router.get('/one/:catId', getone)
router.get('/all', getall)
router.post('/new',decodetoken,create)

export default router;