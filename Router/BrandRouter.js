const express = require('express');
const BrandRouter = express.Router();
const BrandController = require("../Controller/Brand/BrandController")
const { SingleuploadFile } = require("../Helpers/SingleUploadFile")


try {
    // Define routes
    BrandRouter.get('/', BrandController.BrandListing);
    BrandRouter.get('/Add', BrandController.AddBrand);
    BrandRouter.get('/delete/:BrandId', BrandController.DeleteBrand);
    BrandRouter.post('/AddBrandOperation/', SingleuploadFile, BrandController.AddBrandOperation);
    BrandRouter.get('/editBrand/:BrandId', BrandController.editBrand);
    BrandRouter.post('/EditBrandOperations/', BrandController.EditBrandOperations);


}
catch (err) {
    console.log("Brand Router Issue : ", err.message)
}

module.exports = BrandRouter;