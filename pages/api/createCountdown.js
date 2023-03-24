import Countdown from "../../models/Countdown";

export default async function handler(req, res) {
  let countdown = await Countdown.create(req.body);
  res.json({ id: countdown._id });
}
