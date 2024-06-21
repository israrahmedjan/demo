const CategoryModel = require("../Models/ModelCategory");
const BrandModel = require("../Models/Brand/ModelBrand");
const validateFields = async (requiredFields) => {
  let errors = [];
  Object.entries(requiredFields).forEach(([key, value]) => {
    console.log(key + ": " + value);
    if (!value || !value.trim()) {
      errors.push(`${key} is required`)
    }
  });
  return errors;
}

const categoryFilter = async (catId) => {

  let categories = [];

  if (catId) {

    const specificCategory = await CategoryModel.findById(catId);
    const otherCategories = await CategoryModel.find({ _id: { $ne: catId } });
    categories = [specificCategory, ...otherCategories];

  }
  else {
    categories = await CategoryModel.find();
  }
  return categories;

}

const BrandFilter = async (BrandId) => {

  let Brands = [];

  if (BrandId) {

    const specificBrand = await BrandModel.findById(BrandId);
    const otherBrands = await BrandModel.find({ _id: { $ne: BrandId } });
    return Brands = [specificBrand, ...otherBrands];

  }
  else {
    return Brands = await BrandModel.find();
  }


}
module.exports = { validateFields, categoryFilter, BrandFilter };




