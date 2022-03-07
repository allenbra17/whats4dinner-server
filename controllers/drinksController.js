const Express = require('express');
const router = Express.Router();
const { DrinksModel } = require("../model")



router.get("/all", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin" || userId === req.user.id)
    try{
        const allDrinks = await DrinksModel.findAll()
        res.status(200).json(allDrinks)
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
        const userCocktails = await DrinksModel.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(userCocktails);
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

router.post("/create", async (req, res) => {
    const {
        cocktailName,
        mainIngredient,
        cocktailURL,
        imgURL,
        rating
        } = req.body

    try {
        const createDrinks = await DrinksModel.create({
            cocktailName,
            mainIngredient,
            cocktailURL,
            imgURL,
            rating,
            userId: req.user.id
        })

        res.status(201).json({
            message: "Cocktail successfully created",
            createDrinks
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to create cocktail ${err}`
        })
    }
})

router.get("/:userId", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin")
    try {
        const myCocktails = await DrinksModel.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json(myCocktails)
    } catch (err) {
        res.status(500).json({ error: err })
    }else {
        res.send({ error: "You have no privileges to perform this action." })
}})

router.put("/:id", async (req, res) => {
    const { rating } = req.body
    try {
        await DrinksModel.update(
            { rating }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "Rating successfully updated",
                updatedDrinks: result
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
        await DrinksModel.destroy({
            where: { id: req.params.id }
        })
        
        res.status(200).json({
            message: "Cocktail deleted",
        })
        
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete cocktail ${err}`
        })
    }} else {
        res.send({ error: "You have no privileges to perform this action." })
    }
})


module.exports = router;