// userController.js

const CategoryModel = require("../../Models/ModelCategory");
const { validateFields } = require("../../Utilities/Utilities")



// Views File 
// Category Listing
const CategoryListing = async (req, res) => {
  // Business logic to handle user registration
  //res.send('User homepage');

  try {
    const Category = await CategoryModel.find(); // retrieves all Categorys
    // example, setting title

    res.render('Category/CategoryView', { Category });
    // console.log("testing....", Category)
    return Category;
  } catch (err) {
    //console.error(err);
  }
  //res.send('User registration successful');
};
// Category Listing End

// Add Category View
const AddCategory = async (req, res) => {

  let data = {
    name: '',
    url: ''
  }
  try {
    let previousdata = { errors: null, data: data };

    return res.render('Category/AddCategoryView', { previousdata: previousdata });
    //console.log("Category Views:")
  } catch (err) {
    res.send(`Server Error : ${err.message}`);
  }


};

// Add Category View End
// Add Category 
const AddCategoryOperation = async (req, res) => {
  // Business logic to handle user login
  const { name, url } = req.body;
  console.log("data:", req.body);
  let data = {
    name: name,
    url: url
  }


  try {
    let errors = [];

    errors = await validateFields(data);
    console.log("Length : ", errors.length)
    if (errors.length > 0) {
      let previousdata = { errors: errors, data: data };

      res.render('Category/AddCategoryView', {
        previousdata: previousdata
      })
    }

    const Category = new CategoryModel(data);
    await Category.save();

    req.flash('success', 'Category Added successfully!');
    res.redirect('/Category');
    // res.send('Category saved successfully!');
  } catch (err) {
    console.error(err);
  }

};

// Add Category End



const DeleteCategory = async (req, res) => {
  // Business logic to handle user login



  try {


    const CategoryID = req.params.CategoryId;

    //console.log(idw); // Corrected variable name

    try {
      await CategoryModel.findByIdAndDelete(CategoryID);
      req.flash('success', 'Category deleted successfully!');
      res.redirect('/Category');
      // console.log(`Category with id ${Categorys} deleted successfully`);
    } catch (err) {
      console.error(err);
    }

    res.send(`Delete Category Page. Category ID: ${CategoryID}`);

  }
  catch (err) {
    console.log(err)
  }

};

const editCategory = async (req, res) => {
  const categoryID = req.params.CategoryId;


  try {

    const Category = await CategoryModel.findById(categoryID);
    console.log("Category ID", Category.category);



    if (Category) {
      res.render('Category/EditCategoryView', {
        Category: Category,

      })
    }
  } catch (err) {
    console.error(err);
    res.send("Server Error!");
  }

}

const EditCategoryOperations = async (req, res) => {
  // Business logic to handle user login




  const { categoryId, name, url } = req.body;

  //console.log(idw); // Corrected variable name

  CategoryObj = {
    name: name,
    url: url
  }
  try {
    const category = await CategoryModel.findByIdAndUpdate(categoryId, CategoryObj);
    if (category) {
      req.flash('success', 'Category Updated  successfully!');
      res.redirect('/Category');
    }
    // console.log(`Category with id ${Categorys} deleted successfully`);
  }

  catch (err) {
    //console.log(err)
    res.send('Server Error : ');

  }



}



// Export the controller functions
module.exports = {
  CategoryListing,
  AddCategory,
  DeleteCategory,
  AddCategoryOperation,
  editCategory,
  EditCategoryOperations
};
