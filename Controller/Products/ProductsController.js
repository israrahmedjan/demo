// userController.js

const ProductModel = require("../../Models/Products/ModelProducts");
const CategoryModel = require("../../Models/ModelCategory")
const { validateFields, categoryFilter, BrandFilter } = require("../../Utilities/Utilities")
const { FileUploadOnCloudnary, uploadFile } = require("../../Helpers/UploadFile")
const { SingleuploadFile, SingleFileUploadOnCloudnary } = require("../../Helpers/SingleUploadFile");
const BrandModel = require("../../Models/Brand/ModelBrand");





// Views File 
// Product Listing
const ProductListing = async (req, res) => {
  // Business logic to handle user registration
  //res.send('User homepage');

  try {
    const products = await ProductModel.find().populate('category'); // retrieves all products

    // example, setting title

    res.render('Products/ProductsView', { products });
    //console.log(products)
    return products;
  } catch (err) {
    console.error(err);
  }
  //res.send('User registration successful');
};
// Product Listing End



// Add Product View End


// Edit Product View
const EditProduct = async (req, res) => {

  //res.send("Process is exit");
  //process.exit();
  const productId = req.params.productId;


  try {

    const product = await ProductModel.findById(productId);


    console.log("Category ID", product.category);

    // console.log("category id : ",products , "Product ID : ", productId);
    const catId = product.category;
    const BrandId = product.brand;
    // const specificCategory = await CategoryModel.findById(catId);
    // const otherCategories = await CategoryModel.find({ _id: { $ne: catId } });
    // const categories = [specificCategory, ...otherCategories];
    const categories = await categoryFilter(catId);
    const Brands = await BrandFilter(BrandId);

    console.log("Latest Brands : ", Brands);
    let prevouseData = {
      product: product,
      category: categories,
      brand: Brands,
      errors: null
    }
    res.render('Products/EditProductView', {
      prevouseData: prevouseData
    });
  } catch (err) {
    console.error(err);
  }


};

// Edit Product View End


// Product update operations 


const UpdateProductOperation = async (req, res) => {



  // Business logic to handle user login
  const { title, price, description, category, productId, Brand, stock, discountPercentage, sku } = req.body;
  console.log("In process", req.body)
  let product =
  {
    title: title,
    price: price,
    description: description,
    category: category,
    brand: Brand,
    _id: productId
  }

  try {
    // const productSave = new ProductModel(product);

    let errors = [];
    errors = await validateFields(product);
    const categories = await categoryFilter(category);
    const Brands = await BrandFilter(Brand);
    if (errors.length > 0) {
      let prevouseData =
      {
        product: product,
        category: categories,
        brand: Brands,
        errors: errors,

      }

      // return res.render('Products/EditProdductView', { PreviousData: PreviousData });
      return res.render('Products/EditProductView', {
        prevouseData: prevouseData
      });
      // res.send("Validate the fields!");
    }
    else {
      //console.log("Our product is:", product);
      let product_new = { ...product, stock: stock, discountPercentage: discountPercentage, sku: sku }


      const rs = await ProductModel.findByIdAndUpdate(productId, product_new);
      if (rs) {
        console.log("operation success!");

      }
      else {
        //  console.log("operation failed");
      }
      req.flash('success', 'Product Updated successfully!');
      res.redirect("/products");
    }



    // res.send('Product saved successfully!');

  } catch (err) {
    // console.error("Error retrieving categories:", err);
    console.log(err.message);
    // Render the view with an error message

  }







};

// Update product operations End


// Add Product 

// Add Product View
const AddProduct = async (req, res) => {

  const Category = await CategoryModel.find(); // retrieves all 
  const Brand = await BrandModel.find(); // retrieves all 

  let product =
  {
    title: "",
    price: "",
    description: "",
    category: ""
  }

  let prevouseData =
  {
    product: product,
    category: Category,
    brand: Brand,
    errors: null
  }


  try {
    res.render('Products/AddProductsView', { prevouseData: prevouseData });
  } catch (err) {
    console.error(err);
  }


};

const AddProductOperation = async (req, res) => {


  const { title, price, description, category, Brand, stock, discountPercentage, sku } = req.body;




  try {

    let product =
    {
      title: title,
      price: price,
      description: description,
      category: category,
      brand: Brand
    }



    let errors = [];
    errors = await validateFields(product);


    if (errors.length > 0) {
      // const Category = await CategoryModel.find(); // retrieves all 

      if (!req.file) {
        errors.push("Product Thumbnail image also Required");
      }
      const Category = await CategoryModel.find();
      const Brand = await BrandModel.find(); // retrieves all 

      let prevouseData =
      {
        product: product,
        category: Category,
        brand: Brand,
        errors: errors
      }
      console.log("Data", prevouseData);
      return res.render('Products/AddProductsView', { prevouseData: prevouseData });
      //res.redirect("/products/Add");
    }
    else {

      // Upload Images Process
      const ProductImages = await FileUploadOnCloudnary(req.files);
      if (ProductImages) {
        product = { ...product, ...ProductImages, stock: stock, discountPercentage: discountPercentage, sku: sku };
      }
      const productSave = new ProductModel(product);
      await productSave.save();
      req.flash('success', 'Product Added successfully!');
      res.redirect("/products");

      // console.log("Our Products", product);


    }



  }

  catch (err) {

  }

}







// Add Product End




const DeleteProduct = async (req, res) => {
  // Business logic to handle user login 
  try {


    const ProductID = req.params.productId;

    //console.log(idw); // Corrected variable name

    try {
      await ProductModel.findByIdAndDelete(ProductID);
      req.flash('success', 'Product deleted successfully!');
      res.redirect('/Products');
      // console.log(`Product with id ${products} deleted successfully`);
    } catch (err) {
      console.error(err);
    }

    res.send(`Delete Product Page. Product ID: ${ProductID}`);

  }
  catch (err) {
    console.log(err)
  }

};




const ShowProducts = async (req, res) => {
  try {
    const products = await ProductModel.find(); // retrieves all products
    // example, setting title
    dialog.info('Ground control to major Tom.', 'My app', function (exitCode) {
      if (exitCode == 0) console.log('User clicked OK');
    })
    return products
    // return products;
  } catch (err) {
    console.error(err);
  }

}

const FileUploadView = (req, res) => {
  res.render('uploadFile');
  //console.log()
}



const FileUploadOperations = async (req, res) => {
  let errmsg = "hello";
  console.log("Data", req.body, req.file);
  try {
    errmsg = await handleFileUpload(req, res);
  } catch (err) {
    errmsg = err;
  }

  console.log("After Outer block data", errmsg);
  res.send(errmsg === "New hello" ? "File upload failed!" : "Successful File Uploaded!");
};


const UpdateImages = async (req, res) => {



  const productId = req.params.productId;


  try {

    const product = await ProductModel.findById(productId);


    //let Ajax_url =
    let Ajax_link =
    {
      SubImageLink: `${req.protocol}://${req.get('host')}/products/UpdateProductSubImage`,
      MainImageLink: `${req.protocol}://${req.get('host')}/products/UpdateProductMainImage`

    }
    //MainImageLink: `${req.protocol}://${req.get('host')}/products/UpdateProductSubImage`
    console.log(Ajax_link);
    return res.render('Products/UpdateImagesView', {
      Product: product,
      Ajax_link: Ajax_link
    });
  } catch (err) {
    console.error(err);
  }



}


const UpdateProductMainImage = async (req, res) => {


  console.log("Files and data", req.file, "Data", req.body);

  //console.log("Recieved Files : ",req.file,req.body);
  if (!req.file) {
    res.send("No change allowd1");
  }
  else {

    const productId = req.body;


    try {
      const { productId, ImageIndex } = req.body;
      const product = await ProductModel.findById(productId);
      const NewImage = await SingleFileUploadOnCloudnary(req.file)
      console.log(ImageIndex);
      product.thumbnail = NewImage;//"Image update should be here";

      console.log(product)


      // const productSave = new ProductModel(product);
      await ProductModel.findByIdAndUpdate(productId, product);
      //console.log(JSON.stringify(product))
      // res.send("File change successfull!");
      res.json({ url: NewImage, success: true, message: 'Image uploaded successfully' });

    }
    catch (err) {
      console.log("Error In")
    }
  }
  //  res.send({ message: 'Data received successfully 1111' });


};


const UpdateProductImage = async (req, res) => {
  console.log("Recieved Files : ",);
  res.send({ message: 'Data received successfully 1111' });
}

const UpdateProductSubImage = async (req, res) => {
  console.log("Recieved Files : ", req.file, req.body);
  if (!req.file) {
    res.send("No change allowd1");
  }
  else {
    try {
      const { productId, ImageIndex } = req.body;
      const product = await ProductModel.findById(productId);
      const NewImage = await SingleFileUploadOnCloudnary(req.file)
      //console.log("New Image Link : ",ImageIndex);
      product.images[ImageIndex] = NewImage;//"Image update should be here";
      await ProductModel.findByIdAndUpdate(productId, product);
      res.json({ url: NewImage, success: true, message: 'Image uploaded successfully', index: ImageIndex });
    }
    catch (err) {
      console.log("Error In")
    }
  }
}
// Export the controller functions
module.exports = {
  ProductListing,
  AddProduct,
  EditProduct,
  DeleteProduct,
  AddProductOperation,
  UpdateProductOperation,
  FileUploadView,
  FileUploadOperations,
  UpdateImages,
  UpdateProductImage,
  UpdateProductSubImage,
  UpdateProductMainImage
};
