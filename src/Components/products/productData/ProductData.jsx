import belt from "../assets/belt.jpg";
import cloth1 from "../assets/clothes-1.jpg";
import cloth2 from "../assets/clothes-2.jpg";
// import cloth3 from "../assets/clothes-3.jpg";
// import cloth4 from "../assets/clothes-4.jpg";
import jacket1 from "../assets/jacket-1.jpg";
import jacket2 from "../assets/jacket-2.jpg";
import jacket3 from "../assets/jacket-3.jpg";
import jacket4 from "../assets/jacket-4.jpg";
import jacket5 from "../assets/jacket-5.jpg";
import jacket6 from "../assets/jacket-6.jpg";
import jewellery1 from "../assets/jewellery-1.jpg";
import jewellery2 from "../assets/jewellery-2.jpg";
import jewellery3 from "../assets/jewellery-3.jpg";
import shirt1 from "../assets/shirt-1.jpg";
import shirt2 from "../assets/shirt-2.jpg";
import shoe1 from "../assets/shoe-1.jpg";
import shoe2 from "../assets/shoe-2.jpg";
import shoe3 from "../assets/shoe-3.jpg";
import shoe4 from "../assets/shoe-4.jpg";
import shorts1 from "../assets/shorts-1.jpg";
import shorts2 from "../assets/shorts-2.jpg";
import partyWear from "../assets/party-wear-1.jpg";
import shampoo from "../assets/shampoo.jpg";
import watch1 from "../assets/watch-1.jpg";
import watch2 from "../assets/watch-2.jpg";
import sports2 from "../assets/sports-2.jpg";
import sports3 from "../assets/sports-3.jpg";
import perfume from "../assets/perfume.jpg";
import shoe5 from "../assets/1.jpg";
import sports4 from "../assets/sports-5.jpg";
import sports5 from "../assets/sports-6.jpg";
import watch3 from "../assets/watch-3.jpg";
import hoodie2 from "../assets/3.jpg";
import hoodie1 from "../assets/2.jpg";
import Hat from "../assets/4.jpg";
import watch4 from "../assets/watch-4.jpg";
import testProd from "../assets/test-prod.jpg";


const productsItems = [
  {
    id: 1,
    title: "Hoodie",
    descp: "A cozy and stylish hoodie perfect for casual outings.",
    category: "clothing",
    icon: hoodie1,
    price: 1200,
    link: "./productShowing.jsx",
    image: hoodie1,
    color: "Grey",
    brand: "Brand CC",
    quantity: 51,
    stock: 51,
  },
  {
    id: 2,
    title: "Hoodie",
    descp: "A soft and comfortable hoodie to keep you warm.",
    category: "clothing",
    icon: hoodie2,
    price: 1300,
    link: "./productShowing.jsx",
    image: hoodie2,
    color: "Blue",
    brand: "Brand DD",
    quantity: 48,
    stock: 48,
  },
  {
    id: 3,
    title: "Hat",
    descp: "A trendy hat that adds a cool touch to any outfit.",
    category: "accessories",
    icon: Hat,
    price: 500,
    link: "./productShowing.jsx",
    image: Hat,
    color: "Black",
    brand: "Brand EE",
    quantity: 34,
    stock: 34,
  },
  {
    id: 4,
    title: "Belt",
    descp: "A durable and sleek belt to complete your look.",
    category: "belt",
    icon: belt,
    price: 800,
    link: "./productShowing.jsx",
    image: belt,
    color: "Black",
    brand: "Generic",
    quantity: 36,
    stock: 36,
  },
  {
    id: 5,
    title: "Cloth",
    descp: "Lightweight fabric, ideal for summer wear.",
    category: "women",
    icon: cloth1,
    price: 600,
    link: "./productShowing.jsx",
    image: cloth1,
    color: "White",
    brand: "Brand A",
    quantity: 50,
    stock: 50,
  },
  {
    id: 6,
    title: "Cloth",
    descp: "Stylish and breathable fabric for all-day comfort.",
    category: "women",
    icon: cloth2,
    price: 700,
    link: "./productShowing.jsx",
    image: cloth2,
    color: "Blue",
    brand: "Brand B",
    quantity: 42,
    stock: 42,
  },
  {
    id: 7,
    title: "Jacket",
    descp: "A fashionable jacket perfect for chilly evenings.",
    category: "clothing",
    icon: jacket1,
    price: 3000,
    link: "./productShowing.jsx",
    image: jacket1,
    color: "Black",
    brand: "Brand C",
    quantity: 20,
    stock: 20,
  },
  {
    id: 8,
    title: "Jacket",
    descp: "A warm and comfy jacket for cold days.",
    category: "clothing",
    icon: jacket2,
    price: 3200,
    link: "./productShowing.jsx",
    image: jacket2,
    color: "Navy Blue",
    brand: "Brand D",
    quantity: 25,
    stock: 25,
  },
  {
    id: 9,
    title: "Jacket",
    descp: "Stylish jacket that pairs well with any outfit.",
    category: "clothing",
    icon: jacket3,
    price: 2800,
    link: "./productShowing.jsx",
    image: jacket3,
    color: "Grey",
    brand: "Brand E",
    quantity: 18,
    stock: 18,
  },
  {
    id: 10,
    title: "Jacket",
    descp: "Durable and lightweight jacket for all seasons.",
    category: "clothing",
    icon: jacket4,
    price: 3500,
    link: "./productShowing.jsx",
    image: jacket4,
    color: "Olive Green",
    brand: "Brand F",
    quantity: 15,
    stock: 15,
  },
  {
    id: 11,
    title: "Jacket",
    descp: "Perfect jacket for outdoor activities.",
    category: "clothing",
    icon: jacket5,
    price: 4000,
    link: "./productShowing.jsx",
    image: jacket5,
    color: "Black",
    brand: "Brand G",
    quantity: 10,
    stock: 10,
  },
  {
    id: 12,
    title: "Jacket",
    descp: "A sleek jacket to enhance your style.",
    category: "clothing",
    icon: jacket6,
    price: 4200,
    link: "./productShowing.jsx",
    image: jacket6,
    color: "Brown",
    brand: "Brand H",
    quantity: 12,
    stock: 12,
  },
  {
    id: 13,
    title: "Jewellery",
    descp: "Elegant jewellery piece for special occasions.",
    category: "accessories",
    icon: jewellery1,
    price: 1500,
    link: "./productShowing.jsx",
    image: jewellery1,
    color: "Silver",
    brand: "Brand I",
    quantity: 30,
    stock: 30,
  },
  {
    id: 14,
    title: "Jewellery",
    descp: "Stylish necklace to match any dress.",
    category: "accessories",
    icon: jewellery2,
    price: 2000,
    link: "./productShowing.jsx",
    image: jewellery2,
    color: "Gold",
    brand: "Brand J",
    quantity: 22,
    stock: 22,
  },
  {
    id: 15,
    title: "Jewellery",
    descp: "Beautiful earrings with intricate designs.",
    category: "accessories",
    icon: jewellery3,
    price: 1800,
    link: "./productShowing.jsx",
    image: jewellery3,
    color: "Rose Gold",
    brand: "Brand K",
    quantity: 28,
    stock: 28,
  },
  {
    id: 16,
    title: "Shirt",
    descp: "Casual shirt for everyday wear.",
    category: "clothing",
    icon: shirt1,
    price: 1200,
    link: "./productShowing.jsx",
    image: shirt1,
    color: "White",
    brand: "Brand L",
    quantity: 40,
    stock: 40,
  },
  {
    id: 17,
    title: "Shirt",
    descp: "Comfortable shirt with a classic design.",
    category: "clothing",
    icon: shirt2,
    price: 1500,
    link: "./productShowing.jsx",
    image: shirt2,
    color: "Blue",
    brand: "Brand M",
    quantity: 38,
    stock: 38,
  },
  {
    id: 18,
    title: "Shoe",
    descp: "High-quality running shoes for fitness.",
    category: "footwear",
    icon: shoe1,
    price: 3000,
    link: "./productShowing.jsx",
    image: shoe1,
    color: "Black",
    brand: "Brand N",
    quantity: 25,
    stock: 25,
  },
  {
    id: 19,
    title: "Shoe",
    descp: "Stylish sneakers for casual outings.",
    category: "footwear",
    icon: shoe2,
    price: 2800,
    link: "./productShowing.jsx",
    image: shoe2,
    color: "White",
    brand: "Brand O",
    quantity: 30,
    stock: 30,
  },
  {
    id: 20,
    title: "Shoe",
    descp: "Durable shoes perfect for trekking.",
    category: "footwear",
    icon: shoe3,
    price: 3500,
    link: "./productShowing.jsx",
    image: shoe3,
    color: "Brown",
    brand: "Brand P",
    quantity: 20,
    stock: 20,
  },
  {
    id: 21,
    title: "Shoe",
    descp: "Comfortable sandals for summer.",
    category: "footwear",
    icon: shoe4,
    price: 1500,
    link: "./productShowing.jsx",
    image: shoe4,
    color: "Blue",
    brand: "Brand Q",
    quantity: 35,
    stock: 35,
  },
  {
    id: 22,
    title: "Shorts",
    descp: "Lightweight shorts for warm days.",
    category: "clothing",
    icon: shorts1,
    price: 1000,
    link: "./productShowing.jsx",
    image: shorts1,
    color: "Grey",
    brand: "Brand R",
    quantity: 50,
    stock: 50,
  },
  {
    id: 23,
    title: "Shorts",
    descp: "Comfortable shorts with a sleek design.",
    category: "clothing",
    icon: shorts2,
    price: 1200,
    link: "./productShowing.jsx",
    image: shorts2,
    color: "Black",
    brand: "Brand S",
    quantity: 48,
    stock: 48,
  },
  {
    id: 24,
    title: "Party Wear",
    descp: "Perfect party dress for special evenings.",
    category: "clothing",
    icon: partyWear,
    price: 4000,
    link: "./productShowing.jsx",
    image: partyWear,
    color: "Red",
    brand: "Brand T",
    quantity: 15,
    stock: 15,
  },
  {
    id: 25,
    title: "Shampoo",
    descp: "Gentle shampoo for smooth and shiny hair.",
    category: "personal care",
    icon: shampoo,
    price: 300,
    link: "./productShowing.jsx",
    image: shampoo,
    color: "White",
    brand: "Brand U",
    quantity: 100,
    stock: 100,
  },
  {
    id: 26,
    title: "Watch",
    descp: "Stylish watch with leather straps.",
    category: "accessories",
    icon: watch1,
    price: 2500,
    link: "./productShowing.jsx",
    image: watch1,
    color: "Brown",
    brand: "Brand V",
    quantity: 20,
    stock: 20,
  },
  {
    id: 27,
    title: "Watch",
    descp: "Modern watch with a sleek metal finish.",
    category: "accessories",
    icon: watch2,
    price: 3000,
    link: "./productShowing.jsx",
    image: watch2,
    color: "Silver",
    brand: "Brand W",
    quantity: 22,
    stock: 22,
  },
  {
    id: 28,
    title: "Watch",
    descp: "Digital watch with advanced features.",
    category: "accessories",
    icon: watch3,
    price: 3500,
    link: "./productShowing.jsx",
    image: watch3,
    color: "Black",
    brand: "Brand X",
    quantity: 18,
    stock: 18,
  },
  {
    id: 29,
    title: "Perfume",
    descp: "Refreshing fragrance for daily use.",
    category: "personal care",
    icon: perfume,
    price: 1200,
    link: "./productShowing.jsx",
    image: perfume,
    color: "Clear",
    brand: "Brand Y",
    quantity: 50,
    stock: 50,
  },
  {
    id: 30,
    title: "Shoe",
    descp: "Sports shoes for high performance.",
    category: "footwear",
    icon: shoe5,
    price: 3200,
    link: "./productShowing.jsx",
    image: shoe5,
    color: "Black and White",
    brand: "Brand Z",
    quantity: 30,
    stock: 30,
  },
  {
    id: 31,
    title: "Sportswear",
    descp: "Comfortable sportswear for workouts.",
    category: "clothing",
    icon: sports2,
    price: 2200,
    link: "./productShowing.jsx",
    image: sports2,
    color: "Black",
    brand: "Brand AA",
    quantity: 20,
    stock: 20,
  },
  {
    id: 32,
    title: "Sportswear",
    descp: "Durable sportswear for all weather.",
    category: "clothing",
    icon: sports3,
    price: 2400,
    link: "./productShowing.jsx",
    image: sports3,
    color: "Grey",
    brand: "Brand BB",
    quantity: 18,
    stock: 18,
  },
  {
    id: 33,
    title: "Sportswear",
    descp: "Advanced sportswear for athletes.",
    category: "clothing",
    icon: sports4,
    price: 2600,
    link: "./productShowing.jsx",
    image: sports4,
    color: "Blue",
    brand: "Brand CC",
    quantity: 15,
    stock: 15,
  },
  {
    id: 34,
    title: "Watch",
    descp: "Classic analog watch for a timeless look.",
    category: "accessories",
    icon: watch4,
    price: 2000,
    link: "./productShowing.jsx",
    image: watch4,
    color: "Gold",
    brand: "Brand DD",
    quantity: 20,
    stock: 20,
  },
  {
    id: 35,
    title: "Sportswear",
    descp: "Light and breathable sportswear.",
    category: "clothing",
    icon: sports5,
    price: 2800,
    link: "./productShowing.jsx",
    image: sports5,
    color: "White",
    brand: "Brand EE",
    quantity: 10,
    stock: 10,
  },
  {
    "id": 36,
    "title": "Smartwatch",
    "descp": "A premium smartwatch with multiple features.",
    "category": "accessories",
    "icon": watch2,
    "price": 3500,
    "link": "./productShowing.jsx",
    "image": watch2,
    "color": "Silver",
    "brand": "Brand AF",
    "quantity": 42,
    "stock": 46
  },
  // {
  //   "id": 37,
  //   "title": "Smartphone",
  //   "descp": "A powerful smartphone with top-tier features.",
  //   "category": "electronics",
  //   "icon": phone1,
  //   "price": 15000,
  //   "link": "./productShowing.jsx",
  //   "image": phone1,
  //   "color": "Black",
  //   "brand": "Brand AG",
  //   "quantity": 50,
  //   "stock": 46
  // }
  {
    id: 37,
    title: "Indu",
    descp: "Stylish product",
    category: "testing",
    icon: testProd,
    price: 1,
    link: "./productShowing.jsx",
    image: testProd,
    color: "pink",
    brand: "station Brand",
    quantity: 1,
    stock: 1,
  },
];

export default productsItems;
