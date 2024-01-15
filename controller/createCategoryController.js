import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";




// express().use(express.json())
export const createCategoryController = async (req,res)=>{
    const { name } = req.body;
    try {
        
        // Check if 'name' field is empty or consists only of whitespace characters
        if (!name || name.trim() === "") {
            return res.status(400).send({ message: "Category name is required" });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        });

    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            // Duplicate key error (unique index violation) for 'name' field
            return res.status(400).send({
                success: false,
                message: "Category with this name already exists"
            });
        }
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        });
    }
}
//    
//delete category
export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };
//update
export const updateCategory = async (req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"updated",
            category
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"errrroooor"
        })
        
    }
}

//all category

export const getAllCategory = async (req,res)=>{
    try {
        const category = await categoryModel.find();
        res.status(200).send({
            success:true,
            message:"All category liat",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in getting all category",
            error
        })
    }
}