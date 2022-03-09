const Express = require('express');
const router = Express.Router();
const { FoodModel } = require("../model")



router.get("/all", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin" || userId === req.user.id)
    try{
        const allFood = await FoodModel.findAll()
        res.status(200).json(allFood)
    } catch(err) {
        res.status(500).json({
            error:err
        })
    }else {
        res.send({ error: "You have no privileges to perform this action." })
    }
})
router.get("/mine", async (req, res) => {
    try {
        const userRecipes = await FoodModel.findAll({
            where: {
                userId: req.body.user.id
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
        category,
        recipeURL,
        imgURL,
        rating
        } = req.body
    try {
        const createFood = await FoodModel.create({
            recipeName,
            category,
            recipeURL,
            imgURL,
            rating,
            userId: req.user.id
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

router.get("/:userId", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin")
    try {
        const myRecipes = await FoodModel.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json(myRecipes)
    } catch (err) {
        res.status(500).json({ error: err })
    }else {
        res.send({ error: "You have no privileges to perform this action." })
    }
})

router.put("/:id", async (req, res) => {
    const { rating } = req.body
    try {
        await FoodModel.update(
            { rating }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "Rating successfully updated",
                updatedFood: result
            })
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update rating ${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin" || userId === req.user.id){
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
    }} else {
        res.send({ error: "You have no privileges to perform this action." })
    }
})


module.exports = router;