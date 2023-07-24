import { Router } from "express";
import { createPro, deleting, getall, getallsoft, getone, restoring, softdel, updatePro } from "../controllers/Product";
import { decodetoken } from "../helpers/secure/jwt";
const router = Router();

router.post('/new', decodetoken, createPro)
router.put('/update/:proId', decodetoken,updatePro)
router.get('/get/:proId', decodetoken,getone)
router.get('/getall',decodetoken,getall)
router.get('/allsoft',getallsoft)
router.put('/soft/:proId', decodetoken,softdel)
router.put('/restore/:proId', decodetoken, restoring)
router.delete('/delete/:proId',decodetoken,deleting)

export default router;