// userController.js

const { SingleFileUploadOnCloudnary } = require("../../Helpers/SingleUploadFile");
const BrandModel = require("../../Models/Brand/ModelBrand");
const { validateFields } = require("../../Utilities/Utilities");




// Views File 
// Brand Listing
const BrandListing = async (req, res) => {
  // Business logic to handle user registration
  //res.send('User homepage');

  try {
    const Brand = await BrandModel.find(); // retrieves all Brands
    // example, setting title

    res.render('Brand/BrandView', { Brand });
    console.log("testing....", Brand)
    return Brand;
  } catch (err) {
    //console.error(err);
  }
  res.send('Server Error: ');
}
// Brand Listing End

// Add Brand View
const AddBrand = async (req, res) => {

  try {
    res.render('Brand/AddBrandView', { errors: null, Prevdata: null });
    //console.log("Brand Views:")
  } catch (err) {
    res.send(`Server Error : ${err.message}`);
  }


};

// Add Brand View End
// Add Brand 
const AddBrandOperation = async (req, res) => {
  // Business logic to handle user login

  const { title, description } = req.body;
  let BrandObj = {
    title: title,
    description: description
  }
  try {
    let errors = [];

    errors = await validateFields(BrandObj);
    console.log("Length : ", errors.length);


    //console.log("After : Image getting", image_url);
    if (errors.length > 0) {

      if (!req.file) {
        errors.push("Please select the brand Logo!")
      }

      return res.render('Brand/AddBrandView', {
        errors: errors,
        Prevdata: { ...BrandObj }
      })
    }

    if (req.file) {
      let brand_image = await SingleFileUploadOnCloudnary(req.file)
      BrandObj = { ...BrandObj, brand_image: brand_image }
    }

    const Brand = new BrandModel(BrandObj);
    await Brand.save();

    req.flash('success', 'Brand Added successfully!');
    res.redirect('/Brand');
    // res.send('Brand saved successfully!');
  } catch (err) {
    //console.error(err);
    res.send("Server Error :", err.message);
  }

}

// Add Brand End



const DeleteBrand = async (req, res) => {
  // Business logic to handle user login



  try {


    const BrandID = req.params.BrandId;

    //console.log(idw); // Corrected variable name

    try {
      await BrandModel.findByIdAndDelete(BrandID);
      req.flash('success', 'Brand deleted successfully!');
      res.redirect('/Brand');
      // console.log(`Brand with id ${Brands} deleted successfully`);
    } catch (err) {
      console.error(err);
    }

    res.send(`Delete Brand Page. Brand ID: ${BrandID}`);

  }
  catch (err) {
    console.log(err)
  }

};

const editBrand = async (req, res) => {
  const BrandID = req.params.BrandId;


  try {

    const Brand = await BrandModel.findById(BrandID);
    console.log("Brand ID", Brand.Brand);



    if (Brand) {
      res.render('Brand/EditBrandView', {
        Brand: Brand,

      })
    }
  } catch (err) {
    console.error(err);
    res.send("Server Error!");
  }

}

const EditBrandOperations = async (req, res) => {
  // Business logic to handle user login




  const { BrandId, title, description } = req.body;

  //console.log(idw); // Corrected variable name

  BrandObj = {
    title: title,
    description: description
  }
  try {
    const Brand = await BrandModel.findByIdAndUpdate(BrandId, BrandObj);
    if (Brand) {
      req.flash('success', 'Brand Updated  successfully!');
      res.redirect('/Brand');
    }
    // console.log(`Brand with id ${Brands} deleted successfully`);
  }

  catch (err) {
    //console.log(err)
    res.send('Server Error : ');

  }



}



// Export the controller functions
module.exports = {
  BrandListing,
  AddBrand,
  DeleteBrand,
  AddBrandOperation,
  editBrand,
  EditBrandOperations
};
