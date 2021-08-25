import React from 'react';
import logo from '../icon.ico';
import styles from '../styles.module.css';

const MainTitle = () => {
    
    return (
        <nav className={styles.mainNav}>
            <div className="container" >
                <a className={styles.mainTitleAnchor} href="#">
                    <img className={styles.mainNav} src={logo} />
                    MOVIE LISTER
                </a>
            </div>
        </nav>
    )
}

export default MainTitle;