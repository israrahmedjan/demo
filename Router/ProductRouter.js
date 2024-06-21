const express = require('express');
const ProductRouter = express.Router();
const ProductsController = require("../Controller/Products/ProductsController");
const { uploadFile, multerErrorHandler } = require("../Helpers/UploadFile");
const { SingleuploadFile } = require("../Helpers/SingleUploadFile");


// Define routes

try {
    ProductRouter.get('/', ProductsController.ProductListing);
    ProductRouter.get('/Add', ProductsController.AddProduct);
    ProductRouter.get('/edit/:productId', ProductsController.EditProduct);
    ProductRouter.get('/delete/:productId', ProductsController.DeleteProduct);
    ProductRouter.post('/AddProductOperation/', uploadFile, ProductsController.AddProductOperation);
    ProductRouter.post('/EditProductOperation/', ProductsController.AddProductOperation);
    ProductRouter.post('/UpdateProduct/', ProductsController.UpdateProductOperation);
    ProductRouter.get('/Upload/', ProductsController.FileUploadView);

    //ProductRouter.post('/FileUploadOperations/', upload.single('profilePic'), ProductsController.FileUploadOperations);
    ProductRouter.post('/FileUploadOperations/', uploadFile, ProductsController.FileUploadOperations);
    ProductRouter.get('/UpdateImages/:productId', ProductsController.UpdateImages);
    //ProductRouter.post('/UpdateImagesOperations/', uploadFile, ProductsController.UpdateImagesOperations);
    ProductRouter.post('/UpdateProductSubImage/', SingleuploadFile, ProductsController.UpdateProductSubImage);
    ProductRouter.post('/UpdateProductMainImage/', SingleuploadFile, ProductsController.UpdateProductMainImage);




}
catch (err) {
    console.log("Product Router Error:", err)
}
// Custom middleware function



module.exports = ProductRouter;