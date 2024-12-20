import React from 'react';

import styles from './PageTittle.module.css';

const PageTittle = (text) => {
    return <h1 className={styles.pageTittle}>{text}</h1>;
};
export default PageTittle;
