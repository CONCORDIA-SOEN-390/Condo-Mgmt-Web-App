import Image from "next/image";
import "./styling/style.css";
import NavBar from "../components/GeneralComponents/NavBar";
import AboutUs from "@/components/HomePageComponents/AboutUs";
import Footer from "../components/GeneralComponents/Footer";

export default function Home() {
  return (
    
    <div className="container-hero">
      <NavBar/>
      <div className="content-hero">
        <div className="hero-section-1">
          <h1>Condo Life Made Simple</h1>
          <p>2-3 sentences that we can add here fnejrgnwkrtej gnrtngvrwtngvbnf goirtnmrncg.</p>

          <form className="searchBar" action="">
            <input type="search" placeholder="Search here..." required/>
            <button type="submit">Search</button>
          </form> 
        </div>

        <AboutUs/>
      </div>
      <Footer/>
    </div>
  );
}
