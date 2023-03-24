import Countdown from "../../models/Countdown";
import Day from "../../models/Day";

export default function CountdownPage(props) {
  let countdown = JSON.parse(props.countdown);
  let days = JSON.parse(props.days);

  async function handleSubmit(e) {
    e.preventDefault();
    let day = e.target.day.value;
    let note = e.target.note.value;
    if (!day) return;
    let res = await fetch("/api/addDay", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        day: new Date(day),
        note,
        countdown: countdown._id,
      }),
    });
    let d = await res.json();
  }

  return (
    <div>
      <h1 className="text-xl">
        Countdown: <span className="font-bold">{countdown.name}</span>
      </h1>
      <p>{countdown.start}</p>
      <p>{countdown.end}</p>

      <form onSubmit={handleSubmit}>
        <input type="date" id="day" />
        <input id="note" />
        <button>submit</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  let countdown = await Countdown.findOne({ _id: query.id });
  let days = await Day.find({ countdown: countdown._id });
  return {
    props: {
      title: countdown.name,
      countdown: JSON.stringify(countdown),
      days: JSON.stringify(days),
    },
  };
}
