import express from 'express';
import dotenv from 'dotenv'
import UserRouter from './routes/UserRouter'
import categoryRouter from './routes/categoryRouter'
import SubcateRouter from './routes/SubcateRouter'
import CartRouter from './routes/CartRouter'
import ProductRouter from './routes/ProductRouter'

dotenv.config()
const app = express();

const port = process.env.port

app.use(express.json());

// userendpoint

app.use('/api/user', UserRouter)

// productendpoint

app.use('/api/pro',ProductRouter )

// categroy endpoint

app.use('/api/category', categoryRouter)

// Subcategory endpoint

app.use('/api/sub', SubcateRouter)

// endoint cart
app.use('/api/cart', CartRouter)

app.listen(port, () => console.log(`server is on ${port}`));

