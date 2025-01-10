import React from 'react';

import styles from './PageTittleWithButton.module.css';

/**
 * Similarly to PageTittle, but has a button on the right side
 * @param text - text which will be the header of the page 
 * @param buttonText - text which will be displayed on button 
 * @param buttonFunction - function executed when button is clicked
 */
const PageTittleWithButton = ({ text, buttonText, buttonFunction }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.tittle}>{text}</h1>
            <button className={styles.button} onClick={buttonFunction}>
                {buttonText}
            </button>
        </div>
    );
};
export default PageTittleWithButton;
