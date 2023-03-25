import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <div>
          <h3>Coffee Caffed</h3>
        </div>

        <div className={styles.FooterSection}>

          <div className={styles.FooterList}>
            <h4>Store Location</h4>
            <ul>
              <li>Foutain Gate</li>
              <li>Chaddston</li>
              <li>Box hill</li>
              <li>Richsmon</li>
            </ul>
          </div>

          <div className={styles.FooterList}>
            <h4>About Us</h4>
            <ul>
              <li>Our Story</li>
              <li>Careers</li>
              <li>Offices account</li>
              <li>Wholesale Coffee</li>
            </ul>
          </div>

          <div className={styles.FooterList}>
            <h4>Information</h4>
            <ul>
              <li>Coffee@coffeecaffed.com.au</li>
              <li>Term of service</li>
              <li>Shipping</li>
              <li>Redfund Policy</li>
            </ul>
          </div>

          <div className={styles.FooterList}>
            <h4>Join the news letter</h4>
            <input type="text" placeholder='your email' />
          </div>

        </div>
      </div>
    </footer>
  )
}
