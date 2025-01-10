import React from 'react';

import styles from './PageTittle.module.css';

/**
 * Component created to use equal page tittle in all pages
 * @param text - text which will be the header of the page 
 */
const PageTittle = ({ text }) => {
    return (
        <div>
            <h1 className={styles.pageTittle}>{text}</h1>
        </div>
    );
};
export default PageTittle;
