import Image from "next/image";
import "./styling/style.css";

export default function Home() {
  return (
    
    <div className="container-hero">
      <div className="content-hero">
        <div className="hero-section-1">
          <h1>Condo Life Made Simple</h1>
          <p>2-3 sentences that we can add here fnejrgnwkrtej gnrtngvrwtngvbnf goirtnmrncg.</p>

          <form className="searchBar" action="">
            <input type="search" placeholder="Search here..." required/>
            <button type="submit">Search</button>
          </form> 
        </div>

        <section className="hero-section-2">
          <div className="about-us-content">
            <h3 className="aboutush3">Explore what makes us unique.</h3>

            <div className="cards">
              <div className="card">
                <h5 className="card-title">Seamless Experience</h5>
                <p>
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book.
                </p>
              </div>

              <div className="card">
                <h5 className="card-title">Transparency</h5>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book.{" "}
                </p>
              </div>

              <div className="card">
                <h5 className="card-title">Enhanced Security</h5>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type 
                  specimen book.{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
