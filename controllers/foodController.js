import Food from "../Models/FoodModel.js";



//  add food
const addFood= async(req,res)=>{
    let img_filename = `${req.file.filename}`;
    const food = new Food({
        Title: req.body.title,
        Price: req.body.price,
        Description: req.body.description,
        Image: img_filename ,
        Category: req.body.category,
        
    })
try {
    await food.save();
    res.status(201).json({ message: 'Food added successfully', food })

    
} catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error',err })
}
}

//  get all food

const getAllFood= (req,res)=>{
try {
    
} catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error',err })
}
}

//  get food by id

const getFoodById= (req,res)=>{
try {
    
} catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error',err })
}
}

//  update food

const updateFood= (req,res)=>{
try {
    
} catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error',err })
}
}

//  delete food

const deleteFood= (req,res)=>{
try {
    
} catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error',err })
}
}

export  {
    addFood,
    getAllFood,
    getFoodById,
    updateFood,
    deleteFood,
 
}