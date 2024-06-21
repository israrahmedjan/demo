const express = require('express');
const UserRouter = express.Router();
const UsersController = require("../Controller/User/UsersController")
const { UserLogin } = require("../Helpers/UserAuthentication")


try {
    // Define routes
    UserRouter.get('/', UsersController.Login);
    UserRouter.get('/login', UsersController.Login);
    UserRouter.post('/login', UserLogin, UsersController.LoginOperation);
    UserRouter.get('/logout', UsersController.UserLogOut);
    UserRouter.post('/orders', UsersController.OrderSave);
    UserRouter.post('/userlogin', UsersController.userlogin);
    UserRouter.post('/myorders', UsersController.myorders);


    // CategoryRouter.get('/delete/:CategoryId', CategoryController.DeleteCategory);
    // CategoryRouter.post('/AddCategoryOperation/', CategoryController.AddCategoryOperation);


}
catch (err) {
    console.log("User Login Router issue : ", err)
}

module.exports = UserRouter;