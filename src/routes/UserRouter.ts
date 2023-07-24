import { Router } from "express";
import { register, login, isAdmin, getone, getall } from "../controllers/Usercontroller";
import { decodetoken } from "../helpers/secure/jwt";
const router = Router();

router.post('/register', register)
router.post('/login',login)
router.put('/admin/:usedId',decodetoken,isAdmin)
router.get('/get/:userId',getone)
router.get('/all',getall)

export default router;



