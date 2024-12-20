import React from 'react';
import './AboutUs.css';
import NavigationBar from '../modules/NavigationBar.js';
import Footer from '../modules/Footer.js';

function AboutUs() {
    return (
        <div className="aboutus-page">
            <NavigationBar />
            <div className="homepage">
                <div className="homepage-flex">
                    <img
                        src="aboutus.jpg"
                        alt="AboutUs"
                        className="aboutus-image"
                    />
                    <div>
                        <h2>Nasza misja</h2>
                        <p>
                            Naszym celem jest automatyzacja i optymalizacja
                            procesu wynajmu sprzętu browarniczego przez browary
                            komercyjne dla celów browarów kontraktowych.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
