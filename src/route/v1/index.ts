import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import categoryRoutes from "./category"
import todoRoutes from "./todo";


const router = Router()

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/categories", categoryRoutes)
router.use("/todo", todoRoutes)


export default router


