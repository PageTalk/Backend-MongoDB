const mongoose = require("mongoose");

export const connectDB = (url: String) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "PageTalk"
  });
};