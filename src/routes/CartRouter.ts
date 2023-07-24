import { Router } from "express"
import { addToCart, createcart,allcart } from "../controllers/cartController"
import { decodetoken } from "../helpers/secure/jwt"
const router = Router();


router.post('/new', createcart, decodetoken)
router.get('/allcart', allcart, decodetoken)
router.post('/add', addToCart, decodetoken)

export default router;