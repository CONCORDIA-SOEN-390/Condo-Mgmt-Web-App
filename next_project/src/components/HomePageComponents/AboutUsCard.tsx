import React from 'react';

const AboutUsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    return (
        <div className="card">
            <h5 className="card-title">{title}</h5>
            <p>{children}</p>
        </div>
    );
};

export default AboutUsCard;