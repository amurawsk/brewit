import React from 'react';

import styles from './PageTitle.module.css';

/**
 * Component created to use equal page Title in all pages
 * @param text - text which will be the header of the page 
 */
const PageTitle = ({ text }) => {
    return (
        <div>
            <h1 className={styles.pageTitle}>{text}</h1>
        </div>
    );
};
export default PageTitle;
