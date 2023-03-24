import Countdown from "../../models/Countdown";
import Day from "../../models/Day";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CountdownPage(props) {
  let router = useRouter();
  let countdown = JSON.parse(props.countdown);
  let start = new Date(countdown.start);
  let end = new Date(countdown.end);
  let days = JSON.parse(props.days);

  let refresh = () => router.push(router.asPath);

  useEffect(() => {
    let f = async () => {
      let res = await fetch("/api/addDay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ day: new Date(), countdown: countdown._id }),
      });
      return await res.json();
    };
    f();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let day = e.target.day.value;
    let note = e.target.note.value;
    if (!day) return;
    let res = await fetch("/api/updateDay", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        day: new Date(day),
        note,
        countdown: countdown._id,
      }),
    });
    refresh();
  }

  return (
    <div>
      <h1 className="text-xl">
        Countdown: <span className="font-bold">{countdown.name}</span>
      </h1>
      <p>{countdown.start.slice(0, 10)}</p>
      <p>{countdown.end.slice(0, 10)}</p>
      <p>Total Days: {(end - start) / 86400000}</p>
      <p>Check ins: {days.length}</p>
      <form onSubmit={handleSubmit}>
        <input type="date" id="day" />
        <input id="note" />
        <button>submit</button>
      </form>
      <div>
        {days
          .filter((e, i) => days.findIndex((x) => x.day === e.day) === i) //react strictmode causing duplicates?
          .sort((a, b) => a.day.localeCompare(b.day))
          .map((d) => (
            <div className="flex gap-5" key={d._id}>
              <p>{d.day.slice(0, 10)}</p>
              <p>{d.note}</p>
            </div>
          ))}
      </div>
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
