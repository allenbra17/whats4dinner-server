const Express = require('express');
const router = Express.Router();
const { FoodModel } = require("../model")



router.get("/get", async (req, res) => {
    try{
        const allFood = await FoodModel.findAll()
        res.status(200).json(allFood)
    } catch(err) {
        res.status(500).json({
            error:err
        })
    }
})
router.get("/mine", async (req, res) => {
    try {
        const userRecipes = await FoodModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userRecipes);
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

router.post("/create", async (req, res) => {
    const {
        recipeName,
        mainIngredient,
        recipeURL,
        imgURL,
        } = req.body
        const { id } = req.user
    try {
        const createFood = await FoodModel.create({
            recipeName,
            mainIngredient,
            recipeURL,
            imgURL,
            userID: id
        })

        res.status(201).json({
            message: "Recipe successfully created",
            createFood
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to create Recipe ${err}`
        })
    }
})

router.get("/userID", async (req, res) => {
    const { id } = req.user
    try {
        const myRecipes = await FoodModel.findAll({
            where: {
                userID: id
            }
        })
        res.status(200).json(myRecipes)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put("/:id", async (req, res) => {
    const {
        recipeName,
        mainIngredient,
        recipeURL,
        imgURL,
        } = req.body
    try {
        await FoodModel.update(
            { recipeName,
                mainIngredient,
                recipeURL,
                imgURL }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "Recipe successfully updated",
                updatedFood: result
            })
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update Recipe ${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {

    try {
        await FoodModel.destroy({
            where: { id: req.params.id }
        })
        
        res.status(200).json({
            message: "Recipe deleted",
        })
        
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete Recipe ${err}`
        })
    }
})


module.exports = router;