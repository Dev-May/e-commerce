import { useContext } from "react";
import styles from "./Home.module.css";
import { CounterContext } from "../../Context/CounterContext";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";

export default function Home() {
  let { counter, setCounter } = useContext(CounterContext);

  return (
    <div>
      <LatestProducts />
    </div>
  );
}
