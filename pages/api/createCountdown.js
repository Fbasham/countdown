export default function handler(req, res) {
  console.log(req.body);
  //todo: insert into DB and responsd with mongo document id (for dynamic page)
  res.json({ id: req.body.id });
}
