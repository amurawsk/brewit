import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>brewIT</div>
            <div className={styles.info}>
                <div>
                    <h4>Informacje</h4>
                    <p>Regulamin</p>
                    <p>Polityka Cookies</p>
                    <p>Polityka Prywatności</p>
                </div>
                <div>
                    <h4>Kontakt</h4>
                    <p>E-mail: brewIT@brewIT.pl</p>
                    <p>Telefon: 123456789</p>
                    <p>Pon-Pt: 8:00-20:00</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
