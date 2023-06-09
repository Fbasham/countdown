import Day from "../../models/Day";
import Countdown from "../../models/Countdown";

export default async function handler(req, res) {
  let countdown = req.body.countdown;
  let day = new Date(req.body.day);
  let cd = await Countdown.findOne({ _id: countdown });
  let start = cd.start;
  let end = cd.end;
  if (day < start || day > end) {
    return res.status(400).json("outside date range");
  }
  if (await Day.findOne({ day: day.toLocaleString().slice(0, 10), countdown }))
    return res.json("already created");
  let d = await Day.create({
    day: day.toLocaleString().slice(0, 10),
    countdown,
  });
  res.json({ d });
}
