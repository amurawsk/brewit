import React from 'react';

import styles from './PageTittle.module.css';

const PageTittle = ({ text }) => {
    return (
        <div>
            <h1 className={styles.pageTittle}>{text}</h1>
        </div>
    );
};
export default PageTittle;
