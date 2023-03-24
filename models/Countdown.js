import mongoose from "mongoose";

const CountdownSchema = new mongoose.Schema(
  {
    name: String,
    start: Date,
    end: Date,
  },
  { collection: "Countdown" }
);

export default mongoose.models.Countdown ||
  mongoose.model("Countdown", CountdownSchema);
