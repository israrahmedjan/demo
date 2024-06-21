const express = require('express');
const CategoryRouter = express.Router();
const CategoryController = require("../Controller/Category/CategoryController")


try {
    // Define routes
    CategoryRouter.get('/', CategoryController.CategoryListing);
    CategoryRouter.get('/Add', CategoryController.AddCategory);
    CategoryRouter.get('/delete/:CategoryId', CategoryController.DeleteCategory);
    CategoryRouter.post('/AddCategoryOperation/', CategoryController.AddCategoryOperation);
    CategoryRouter.get('/editCategory/:CategoryId', CategoryController.editCategory);
    CategoryRouter.post('/EditCategoryOperations/', CategoryController.EditCategoryOperations);


}
catch (err) {
    console.log("Category Router Issue : ", err)
}

module.exports = CategoryRouter;