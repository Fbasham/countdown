import { useRouter } from "next/router";

export default function Countdown(props) {
  return (
    <div>
      Countdown: <span>{props.id}</span>
    </div>
  );
}

export function getServerSideProps({ query }) {
  console.log(query);
  return {
    props: {
      title: query.id,
      id: query.id,
    },
  };
}
