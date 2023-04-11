const express = require("express")
const connectDatabase = require("../backend/connect/db")
const cors = require("cors")
const { userRoute } = require("./route/user.route")
const CalculationRoute = require("./route/calculation.route")

require("dotenv").config()




const app = express()
app.use(express.json())
app.use(cors())



app.use("/user", userRoute)
app.use("/calculate", CalculationRoute)







const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Server started")
    try {
        connectDatabase()
        console.log("Db Connected")

    } catch (err) {
        console.log(err.message)
    }

})



