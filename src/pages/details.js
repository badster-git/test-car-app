import Link from "next/link";


const Details = () => {
  return (
    <div>
      {people.map((e, idx) => (
        <div key={idx}>
          <Link as={`/${e.v}/${e.name}`} href="/[vehicle]/[person]">
            <a>Navigate to {e.name}'s {e.v}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Details;
