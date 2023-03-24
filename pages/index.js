import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Countdown from "../models/Countdown";
import { useState } from "react";

export default function Home(props) {
  let router = useRouter();
  let [countdowns, setCountdowns] = useState(JSON.parse(props.countdowns));

  function handleFilter(e) {
    e.preventDefault();
    let re = new RegExp(`${e.target.filter.value || "."}`, "i");
    let filteredCountdowns = countdowns.filter((c) => re.test(c.name));
    if (!e.target.filter.value || !filteredCountdowns.length) {
      setCountdowns(JSON.parse(props.countdowns));
      return;
    }
    setCountdowns(filteredCountdowns);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let name = e.target["countdown-name"].value;
    let start = e.target["countdown-start"].value;
    let end = e.target["countdown-end"].value;
    if (
      !name.trim() ||
      !start ||
      !end ||
      new Date(end) - new Date(start) < 0 ||
      new Date(end) < new Date()
    )
      return;

    let res = await fetch("/api/createCountdown", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, start, end }),
    });
    let data = await res.json();
    router.push(`/countdowns/${data.id}`);
  }

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-bold my-10">Welcome [username]</h1>
      <div className="flex justify-evenly w-full gap-10 max-h-[350px]">
        <div className="border-2 p-2 rounded w-full overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-5">Recent Countdowns</h2>
          <form onSubmit={handleFilter}>
            <input id="filter" placeholder="filter" className="px-2 mb-2" />
          </form>
          <ul className="underline italic list-inside">
            {countdowns.map((c) => (
              <li key={c._id}>
                <Link href={`/countdowns/${c._id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 rounded p-2 w-full">
          <h2 className="text-lg font-semibold mb-5">New Countdown</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 w-full text-center"
          >
            <div className="flex">
              <label htmlFor="countdown-name" className="flex-1 text-left">
                Coundown Name:
              </label>
              <input
                id="countdown-name"
                name="countdown-name"
                className="flex-[3]"
              />
            </div>
            <div className="flex">
              <label htmlFor="countdown-start" className="flex-1 text-left">
                Coundown Start:
              </label>
              <input
                type="date"
                id="countdown-start"
                name="countdown-start"
                className="flex-[3]"
              />
            </div>
            <div className="flex">
              <label htmlFor="countdown-end" className="flex-1 text-left">
                Coundown End:
              </label>
              <input
                type="date"
                id="countdown-end"
                name="countdown-end"
                className="flex-[3]"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-800 text-white rounded px-2 py-1 w-1/2">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  let countdowns = await Countdown.find();

  return {
    props: {
      title: "home",
      countdowns: JSON.stringify(countdowns),
    },
  };
}
