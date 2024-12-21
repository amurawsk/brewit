import React from 'react';

import styles from './PageTittleWithButton.module.css';

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
