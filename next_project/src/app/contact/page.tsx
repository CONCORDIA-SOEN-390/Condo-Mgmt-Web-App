import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/GeneralComponents/NavBar";
import ContactForm from "@/components/ContactPageComponents/ContactForm";
import Footer from "@/components/GeneralComponents/Footer";
import "../styling/style.css";

export default function Contact() {
    return (
        <div className="container-hero">
            <NavBar/>
            <div className="content-contact">
                <h3>Contact Us</h3>
                <ContactForm/>
            </div>
            <Footer/>
        </div>
    )
}