// controllers/bmiController.js
const Calculation = require("../model/calculation.model");
const UserModel = require("../model/user.model")
const express = require("express");
const CalculationRoute = express.Router()
const bcrypt = require("bcryptjs")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Authmiddleware = require("../middleware/middleware");
const calculationModel = require("../model/calculation.model");

// Calculate BMI
CalculationRoute.post("/details", Authmiddleware, async (req, res) => {
    try {
        const { height, weight } = req.body;
        const userId = req.body.userId;
        // Convert height from feet to meters
        const heightInMeters = +height * 0.3048;
        // Calculate BMI
        const bmi = +(+weight / (+heightInMeters * +heightInMeters)).toFixed(2)
        // Create new calculation
        const newCalculation = new Calculation({
            userId,
            height,
            weight,
            bmi
        });
        await newCalculation.save();
        return res.send({ bmi });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }

})



// Get profile

CalculationRoute.get("/getProfile", Authmiddleware, async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await UserModel.findById(userId).select("-password"); // select("-password" for hode passsword
        const profile = { ...user._doc };
        return res.send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})




// Get calculation history
// CalculationRoute.get("/history", Authmiddleware, async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const calculations = await Calculation.find({ userId });
//         return res.send(calculations);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ error: "Server error" });
//     }
// })


CalculationRoute.get("/history", Authmiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;
        const calculations = await Calculation.find({ userId }).sort({ createdAt: -1 });
        return res.send(calculations);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
})











module.exports = CalculationRoute
