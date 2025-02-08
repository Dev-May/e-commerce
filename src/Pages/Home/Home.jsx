import { useContext } from "react";
import styles from "./Home.module.css";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import MainSlider from "../../Components/MainSlider/MainSlider";

export default function Home() {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <LatestProducts />
    </div>
  );
}
