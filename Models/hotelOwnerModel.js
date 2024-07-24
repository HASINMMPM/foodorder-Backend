const hotelOwnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
});
const HotelOwner = mongoose.model("HotelOwner", hotelOwnerSchema);
export default HotelOwner;
