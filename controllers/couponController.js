import Coupon from "../Models/CoupenModel.js";

// create coupen

const createCoupon = async (req, res) => {
  const { code, discount, expiresAt } = req.body;

  try {
    // Create a new coupon object
    const newCoupon = new Coupon({ code, discount, expiresAt });

    // Save the coupon to the database
    await newCoupon.save();
console.log("created Done")
    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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

export { validateCoupon,createCoupon };
