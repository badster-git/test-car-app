import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

export default function Vehicles({ vehicles }: any) {
  return <h1>Hello Vehicles {JSON.stringify(vehicles)}</h1>;
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet("http://localhost:3000/api/vehicles", ctx);
  return { vehicles: json };
};
