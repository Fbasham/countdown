import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
  {
    day: Date,
    note: String,
    countdown: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countdown",
    },
  },
  { collection: "Day" }
);

export default mongoose.models.Day || mongoose.model("Day", DaySchema);
