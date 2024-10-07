import Coupon from "../Models/CoupenModel.js";

// create coupen

const createCoupon = async (req, res) => {
  const { code, discount, expiresAt } = req.body;


  try {
    // Create a new coupon object
    const newCoupon = new Coupon({
      code,
      discount,
      expiresAt: new Date(expiresAt) // Ensure it's a Date object
    });

    // Save the coupon to the database
    await newCoupon.save();
    console.log("Coupon created and will expire at:", expiresAt);
    
    res.status(201).json({ message: "Coupon created successfully and will expire at:", expiresAt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating coupon", error });
  }
};


const validateCoupon = async (req, res) => {
  const { code } = req.body;
  console.log(code)

  try {
    const coupon = await Coupon.findOne({ code:code });
    console.log("Checked coupen",coupon)

    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }

    // Check if the coupon has expired
    if (coupon.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Coupon has expired' });
    }

    res.json({ discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all coupen

const getAllCoupons = async (req, res) => {
  console.log("try to get all coupen")
  try {
    const coupons = await Coupon.find({});
    if(coupons.length === 0){
      return res.status(404).json({ message: 'No coupons found' }); 
    }
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { validateCoupon,createCoupon,getAllCoupons };
