const Express = require('express');
const router = Express.Router();
const { DrinksModel } = require("../model")



router.get("/get", async (req, res) => {
    try{
        const allDrinks = await DrinksModel.findAll()
        res.status(200).json(allDrinks)
    } catch(err) {
        res.status(500).json({
            error:err
        })
    }
})
router.get("/mine", async (req, res) => {
    try {
        const userCocktails = await DrinksModel.findAll({
            where: {
                owner: id
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
        } = req.body
        const { id } = req.user
    try {
        const createDrinks = await DrinksModel.create({
            cocktailName,
            mainIngredient,
            cocktailURL,
            imgURL,
            userID: id
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

router.get("/userID", async (req, res) => {
    const { id } = req.user
    try {
        const myCocktails = await DrinksModel.findAll({
            where: {
                userID: id
            }
        })
        res.status(200).json(myCocktails)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put("/:id", async (req, res) => {
    const {
        cocktailName,
        mainIngredient,
        cocktailURL,
        imgURL,
        } = req.body
    try {
        await DrinksModel.update(
            { cocktailName,
                mainIngredient,
                cocktailURL,
                imgURL }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "cocktail successfully updated",
                updatedDrinks: result
            })
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update cocktail ${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {

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
    }
})


module.exports = router;