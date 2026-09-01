import { Router } from "express"
import {AddSubCategoryController, getSubCategoryController,updateSubCategoryController,deleteSubCategoryController} from "../controllers/subCategory.controller.js"
import auth from "../middleware/auth.js"
 

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth,AddSubCategoryController)
subCategoryRouter.post("/get", getSubCategoryController) //wegen pagination 
subCategoryRouter.put("/update",auth,updateSubCategoryController)
subCategoryRouter.delete("/delete",auth,deleteSubCategoryController)


export default subCategoryRouter