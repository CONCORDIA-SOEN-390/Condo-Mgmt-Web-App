import React from 'react';
import AboutUsCard from './AboutUsCard';

const aboutUsCardsData = [
    {
        title: "Seamless Experience",
        description: `Discover the effortless management of your condo with our intuitive platform. 
        From maintenance requests to neighbor communication, simplify tasks and save time effortlessly. 
        Navigate through your daily routines smoothly, enjoying unparalleled convenience at every step.`
    },
    {
        title: "Enhanced Security",
        description: `Your safety is paramount. With robust security features and encrypted channels, 
        trust us to protect your privacy and assets effectively. Rest assured knowing that your condominium 
        community is fortified against potential threats, allowing you to live worry-free.`
    },
    {
        title: "Community Engagement",
        description: `Stay connected effortlessly. Our platform offers centralized messaging and real-time 
        updates, fostering stronger connections within your condo community. Engage in vibrant discussions, 
        stay informed about upcoming events, and build lasting relationships with your neighbors.`
    }
];

const AboutUs: React.FC<{}> = () => {
    return (
        <section className="hero-section-2">
            <div className="about-us-content">
                <h3 className="aboutush3">Explore what makes us unique.</h3>
                <div className="cards">
                    {aboutUsCardsData.map((card, index) => {
                        return (
                            <AboutUsCard key={index} title={card.title}>
                                {card.description}
                            </AboutUsCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
