
//const { User } = require("../Models/Users.js")

const ModelOrders = require("../../Models/Users/ModelUsersOrder.js")
const ModelUsers = require("../../Models/Users/Users.js")



const Login = async (req, res) => {

  //res.send("Login Successfully! ");
  const UserInfo = req.user;

  res.render('User/userView');

}

const LoginOperation = async (req, res) => {

  res.send("Login Successfully! ");
  //res.render('User/userView');

}


const UserLogOut = async (req, res) => {

  req.logout(function (err) {
    if (err) {
      // handle error
    } else {
      // logout successful
      res.redirect('/');
    }
  })

}


const OrderSave = async (req, res) => {


  const OrderItems = req.body.OrderItems;
  const userinfo = req.body.Addresses;
  const totalAmount = req.body.totalAmount;
  console.log("Order Data : ", req.body);


  // Create a new user order
  const newOrder = new ModelOrders({
    username: userinfo.username,
    email: userinfo.email,
    password: userinfo.password,
    Addresses: userinfo,
    OrderItems: OrderItems,
    totalAmount: totalAmount,
    orderStats: "pending"
  });

  try {
    const savedOrder = await newOrder.save();
    //console.log('Order saved successfully:', savedOrder);
    if (savedOrder) {

      // Create a new user order
      const saveUser = new ModelUsers({
        username: userinfo.username,
        email: userinfo.email,
        password: userinfo.password
      });
      const savers = await saveUser.save();
      if (!savers) {
        console.log("User Already Exist!")
      }
      res.json({ userinfo: userinfo, ok: true });
    }
    else {
      res.json({ userinfo: "Failed", ok: false });
    }
  } catch (err) {

    // if (err.code === 11000) {
    //   console.error('Duplicate email error:', err);
    // } else {
    //   console.error('Error saving order:', err);
    // }
    // //console.error('Error saving order:', error);
  } finally {
    //mongoose.connection.close();
  }


}

const userlogin = async (req, res) => {
  console.log("Data Recieved:", req.body);
  const { email, password } = req.body
  // Define the search criteria
  const searchUser = {
    email: email,
    password: password
  };

  try {
    const user = await ModelUsers.findOne(searchUser);
    if (user) {
      console.log('User found:', user);
      res.json(searchUser)
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    // Close the connection
    /// mongoose.connection.close();
  }
};



const myorders = async (req, res) => {

  const searchOrders = req.body;
  // console.log("Login information:", searchOrders);
  try {
    const myorders = await ModelOrders.find(searchOrders);
    if (myorders.length > 0) {
      // console.log({ data: myroders });
      res.json({ data: true, myorders });
    } else {
      console.log('Orders not found');
      res.json({ data: null });
    }
  } catch (error) {
    console.error('Error finding Orders:', error);
  } finally {
    // Close the connection
    /// mongoose.connection.close();
  }
  //res.json({ mydata: "Please send me my orders!" })
}


module.exports = { Login, LoginOperation, UserLogOut, OrderSave, userlogin, myorders };