const router = require('express').Router();
const { UserModel } = require("../model");
const { DrinksModel } = require("../model");
const { FoodModel } = require("../model");
const bcrypt = require("bcryptjs");

router.get("/drinks", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin")
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
router.get("/food", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin")
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

router.get("/users", async (req, res) => {
    const userId = req.user
    if(userId.role === "admin")
    try{
        const allUsers = await UserModel.findAll()
        res.status(200).json(allUsers)
    } catch(err) {
        res.status(500).json({
            error:err
        })
    }else {
        res.send({ error: "You have no privileges to perform this action." })
    }
})


router.delete("/users/:id", async(req, res) => {
        const userId = req.user

        if(userId.role == "admin") {
            try {
                const query = {
                    where: {
                        id: req.params.id
                    }
                };
                await UserModel.destroy(query);
                res.status(200).json({ message: "User Removed"});
            } catch(err) {
                res.status(500).json({ error: err });
            }
        } else {
            res.send({ error: "You have no privileges to perform this action." })
        }
})
router.put("/users/:id", async(req, res) => {
        const userId = req.user
        const { email,
            password} = req.body

        if(userId.role == "admin") {
            try {
               
                await UserModel.update(
                    { email: email,
                        password: bcrypt.hashSync(password, 13),
                    },
            
                     
                    { where: { id: req.params.id }, returning: true }
                )
                
                res.status(200).json({ message: "Password successfully updated"});
            } catch(err) {
                res.status(500).json({ error: err });
            }
        } else {
            res.send({ error: "You have no privileges to perform this action." })
        }
})

module.exports = router