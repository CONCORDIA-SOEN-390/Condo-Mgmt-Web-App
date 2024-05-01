import Link from "next/link";
import "./styling/style.css";
import NavBar from "../components/GeneralComponents/NavBar";
import AboutUs from "@/components/HomePageComponents/AboutUs";
import Footer from "../components/GeneralComponents/Footer";
import {auth} from "@/lib/auth";
export default async function Home() {
  const session = await auth()
  console.log(session)
  return (
    
    <div className="container-hero">
      <NavBar/>
      <div className="content-hero">
        <div className="hero-section-1">
          <h1>Condo Life Made Simple</h1>
          <p>Discover the simplicity of condo management and take control of your time. Get started today and unlock convenience at your fingertips.</p>

          <Link href="/signup">
              <button className="bg-yellow-950 hover:bg-yellow-900 text-white text-2xl font-bold py-5 px-24 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                Sign Up
              </button>
          </Link>
        </div>

        <AboutUs/>
      </div>
      <Footer/>
    </div>
  );
}
