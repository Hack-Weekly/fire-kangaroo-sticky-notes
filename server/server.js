const express = require("express")
const app = express()

const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "development"

// Enable express request url and body parsing
app.use(express.urlencoded({extended: true}) )
app.use(express.json())

// Router(s) config
app.use('/api', require("./routes/api"))

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT} in ${MODE} mode`);
})
