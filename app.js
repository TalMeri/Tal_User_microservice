const express = require("express");
const app = express();
const userRouter = require("./routes/UserRoutes");
const authRouter = require("./routes/AuthRoutes");


app.use(express.json());
app.use("/user/", userRouter);
app.use("/auth/", authRouter);

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

(async () => {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((() => console.log('Connected Successfully'))).catch((err) => { console.error(err); })
})();

app.listen(3004, () => {
  console.log("Server is running on port 3004");
});

module.exports = app;