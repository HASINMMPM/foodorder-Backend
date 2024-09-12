import { User } from "../Models/userModel.js";

// add items to cart
const additemToCart = async (req, res) => {
  try {
    const id = req.params.id;
    let userData = await User.findOne({ _id: id });
    if(!userData){
      return res.status(404).send({ message: "User not found" });
    }
    console.log("userdata", userData);
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // userData.markModified("cartData"); // to inform mongoose its updated and its work with saving
    // const updatedUser = await userData.save();
    // console.log(updatedUser);
    // res.send("Item added to cart successfully");
    await User.findByIdAndUpdate(id,{cartData})
    res.json({succes:true,messege:"Added to Cart"})
  } catch (error) {
    console.log("error is :", error);
    res.send(error);
  }
};

// remove from cart

const removeFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    let userData = await User.findOne({ _id: id });
    console.log("userdata", userData);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    if (cartData[req.body.itemId] === 0) {
      delete cartData[req.body.itemId];
    }
    await User.findByIdAndUpdate(id,{cartData})
    res.json({succes:true,messege:"Remove From Cart"})
  } catch (err) {
    res.status(400).send("Item not found in cart");
    return;
  }
};

// get cart Items
const getCartItems = async (req, res) => {
  try {
    const id = req.params.id;
    let userData = await User.findOne({ _id: id });
    console.log("userdata", userData);
    const cartData = userData.cartData
    res.json({succes:true,cartData:cartData})
  } catch (error) {
    console.log("error is :", error);
    res.send(error);
  }
};

export { additemToCart, removeFromCart,getCartItems };
