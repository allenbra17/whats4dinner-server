const router = require('express').Router();
const { UserModel } = require("../model");
const bcrypt = require("bcryptjs");

router.delete("/user/:id", async(req, res) => {
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
router.put("/user/:id", async(req, res) => {
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