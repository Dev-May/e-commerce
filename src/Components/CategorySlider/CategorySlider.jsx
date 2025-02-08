import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-7 mx-10">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            {/* {console.log(category)} */}
            <img
              src={category.image}
              className="w-full h-[400px]"
              alt={category.name}
            />
            <h4 className="m-3 font-semibold">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
