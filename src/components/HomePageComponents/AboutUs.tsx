import React from 'react';
import AboutUsCard from './AboutUsCard';

const aboutUsCardsData = [
    {title: "Seamless Experience",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book.`
    },
    {title: "Variety of Choice",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book.`
    },
    {title: "Enhanced Security",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book.`
    }
  ];

const AboutUs: React.FC<{}> = () => {
    return (
        <section className="hero-section-2">
          <div className="about-us-content">
            <h3 className="aboutush3">Explore what makes us unique.</h3>

            <div className="cards">
              {aboutUsCardsData.map(card =>{
                return(
                  <AboutUsCard title={card.title}>
                    {card.description}
                </AboutUsCard>
                )
              })}
            </div>
          </div>
        </section>
    );
};

export default AboutUs;