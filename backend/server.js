require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const flashCardRoutes = require("./routes/flashCardRoutes")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/cards", flashCardRoutes)

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(URI, {})
        console.log(`MongoDB is connected: ${connect.connection.host}`)
    } catch (error) {
        console.log("MongoDB error:", error)
        process.exit()
    }
}

connectDB()

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})