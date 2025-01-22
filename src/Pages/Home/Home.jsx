import { useContext } from "react";
import styles from "./Home.module.css";
import { CounterContext } from "../../Context/CounterContext";

export default function Home() {
  let { counter, setCounter } = useContext(CounterContext);

  return (
    <div>
      Home {counter}
      <button
        className="bg-orange-400 mx-2 p-1 rounded-md"
        onClick={() => {
          setCounter(Math.random() * 5);
        }}
      >
        change number
      </button>
    </div>
  );
}
