import styles from '../page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Environmental Awareness</h1>
        <ul className={styles.navLinks}>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Resources</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Image Section */}
      <div className={styles.imageContainer}>
        <img src="/images/background.jpg" alt="Environmental Awareness" />
        <p className={styles.tagline}>“Together we can make a difference – protect our planet, save our future.”</p>
      </div>

      {/* Facts Section */}
      <section className={styles.factsSection}>
        <h3 className={styles.factsHeading}>Environmental Facts</h3>
        <div className={styles.factsListContainer}>
            <ul className={styles.factsList}>
            <li>Every year, we lose 18 million acres of forest.</li>
            <li>The average person generates 4.5 pounds of waste daily.</li>
            <li>Approximately 1 million sea creatures die annually due to plastic waste.</li>
            <li>Only 9% of plastic ever produced has been recycled.</li>
            <li>Deforestation contributes to 15% of global greenhouse gas emissions.</li>
            <li>Coral reefs are home to 25% of marine species, but they are rapidly dying.</li>
            <li>One reusable water bottle can save an average of 170 plastic bottles annually.</li>
            <li>More than 1.6 billion people depend on forests for their livelihoods.</li>
            </ul>
        </div>
      </section>


      {/* Buttons Section */}
      <section className={styles.buttonsSection}>
        <button className={styles.button}>Learn More</button>
        <button className={styles.button}>Get Involved</button>
        <button className={styles.button}>Donate</button>
      </section>
    </div>
  );
}
