import mongoose from "mongoose";

console.log(process.env.MONGODB_URL, "mmm");
mongoose.set("strictQuery", false);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
}

export default connect;


// tZFL2dqO3l3A8VHk
