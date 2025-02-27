import axios from "axios";
import styles from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  console.log(data?.data?.data);
  console.log("isLoading: ", isLoading);
  console.log("isFetching: ", isFetching);

  return (
    <div className="row my-10">
      {data?.data.data?.map((brand, i) => (
        <div key={i} className="w-1/4 p-4">
          <div className="inner">
            <img src={brand.image} alt={brand.name} className="w-full" />
            {/* <h4 className="text-center font-semibold">{brand.name}</h4> */}
          </div>
        </div>
      ))}
    </div>
  );
}
