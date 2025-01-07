import React from 'react';
import NavigationBar from '../modules/NavigationBar.jsx';
import Footer from '../modules/Footer.jsx';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles.aboutUsPage}>
            <NavigationBar />
            <div className={styles.homepage}>
                <div className={styles.homepageFlex}>
                    <img
                        src="aboutus.jpg"
                        alt="AboutUs"
                        className={styles.aboutUsImage}
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
};

export default AboutUs;
