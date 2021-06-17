import Link from "next/link";
import { VehiclePerson } from "../../api/VehiclePerson";

const people = [
  { vehicle: "car", ownerName: "john" },
  { vehicle: "airplane", ownerName: "james" },
  { vehicle: "boat", ownerName: "robert" },
];

export interface ListProps {
  ownersList: VehiclePerson[] | undefined;
}

export default function List({ ownersList }: ListProps) {
  return (
    <div>
      {ownersList?.map((e, idx) => (
        <div key={idx}>
          <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.getInitialProps = () => {
  return { ownersList: people };
};
