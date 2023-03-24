import Day from "../../models/Day";

export default async function handler(req, res) {
  let day = await Day.findOneAndUpdate(
    { day: new Date(req.body.day), countdown: req.body.countdown },
    req.body,
    {
      new: true,
      upsert: true,
    }
  );
  res.json({ day });
}
