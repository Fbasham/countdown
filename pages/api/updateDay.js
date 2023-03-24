import Day from "../../models/Day";
import Countdown from "../../models/Countdown";

export default async function handler(req, res) {
  let countdown = req.body.countdown;
  let day = new Date(req.body.day);
  let cd = await Countdown.findOne({ _id: countdown });
  let start = cd.start;
  let end = cd.end;
  if (day < start || day > end || day > new Date()) {
    return res.json("outside date range");
  }
  let d = await Day.findOneAndUpdate({ day, countdown }, req.body, {
    new: true,
    upsert: true,
  });
  res.json({ d });
}
