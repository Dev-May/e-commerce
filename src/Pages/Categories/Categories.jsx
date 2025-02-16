import axios from "axios";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(data?.data?.data);
  console.log("isLoading: ", isLoading);
  console.log("isFetching: ", isFetching);

  return (
    <div className="row">
      {data?.data.data?.map((category, i) => (
        <div key={i} className="w-1/4">
          <img src={category.image} alt={category.name} />
          <h4>{category.name}</h4>
        </div>
      ))}
    </div>
  );
}
