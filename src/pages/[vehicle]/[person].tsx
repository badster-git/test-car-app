import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { VehiclePerson } from "../../../api/VehiclePerson";

export interface PersonProps {
  ownersList?: VehiclePerson[];
}

const people = [
  { vehicle: "car", ownerName: "john" },
  { vehicle: "airplane", ownerName: "james" },
  { vehicle: "boat", ownerName: "robert" },
];

export default function Person({ ownersList }: PersonProps) {
  const router = useRouter();
  return <pre>{JSON.stringify(ownersList, null, 4)}</pre>;
}

interface MyNextPageContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}

Person.getInitialProps = async ({ query, req }: MyNextPageContext) => {
  return { ownersList: people };
};
