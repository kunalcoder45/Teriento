import { Link } from 'react-router-dom';
import "./Category.css";
import bag from "./assets/bag.svg";
import coat from "./assets/coat.svg";
import cosmetics from "./assets/cosmetics.svg";
import dress from "./assets/dress.svg";
import glasses from "./assets/glasses.svg";
import hat from "./assets/hat.svg";
import jacket from "./assets/jacket.svg";
import jewelry from "./assets/jewelry.svg";
import perfume from "./assets/perfume.svg";
import shoes from "./assets/shoes.svg";
import shorts from "./assets/shorts.svg";
import watch from "./assets/watch.svg";
import tee from "./assets/tee.svg";

const categories = [
  { id: 1, title: "Bags", count: 24, icon: bag, link: "/bags" },
  { id: 2, title: "Coat", count: 28, icon: coat, link: "/coats" },
  { id: 3, title: "Cosmetics", count: 12, icon: cosmetics, link: "/cosmetics" },
  { id: 4, title: "Women Dress", count: 27, icon: dress, link: "/women-dress" },
  { id: 5, title: "Glasses", count: 21, icon: glasses, link: "/glasses" },
  { id: 6, title: "Hat", count: 21, icon: hat, link: "/hats" },
  { id: 7, title: "Jacket", count: 24, icon: jacket, link: "/jackets" },
  { id: 8, title: "Jewelry", count: 24, icon: jewelry, link: "/jewelry" },
  { id: 9, title: "Perfumes", count: 31, icon: perfume, link: "/perfumes" },
  { id: 10, title: "Shoes", count: 29, icon: shoes, link: "/shoes" },
  { id: 11, title: "Men Shorts", count: 24, icon: shorts, link: "/men-shorts" },
  { id: 12, title: "T-Shirts", count: 28, icon: tee, link: "/t-shirts" },
  { id: 13, title: "Watches", count: 21, icon: watch, link: "/watches" },
];



const Category = () => {

  return (
    <div className="cate-Container">
      {categories.map((category) => (
        <div className="category" key={category.id}>
          <div className="cate-Items">
            <div className="cate-Img-box">
              <img src={category.icon} alt={category.title} />
            </div>
            <div className="title">
              <p>{category.title}</p>
            </div>
            <div className="available">
              <p>( {category.count} )</p>
            </div>
            <div className="show">
              <Link to={category.link}>Show All</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
