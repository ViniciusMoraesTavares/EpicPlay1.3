import React from 'react';
import { FaInstagram } from 'react-icons/fa'; 
import styles from './SobreNos.module.css'; //module pq o normal da erro

const SobreNos = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>EpicPlay</div>
      </header>
      <main className={styles['about-us']}>
        <section className={styles.intro}>
          <h1>Sobre a EpicPlay</h1>
          <p>A EpicPlay é uma plataforma dedicada a trazer uma experiência única de jogos digitais, criada por um time de apaixonados por tecnologia e jogos.</p>
        </section>
        <section className={styles.team}>
          <h2>Conheça o time </h2>
          <div className={styles['team-member']}>
            <img src="/uploads/vini.png" alt="Vinicius Moraes" className={styles['team-photo']} />
            <h3>Vinicius Moraes</h3>
            <a href="https://www.instagram.com/vini.mooraes/?hl=pt-br" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24}/>
            </a>
          </div>
          <div className={styles['team-member']}>
            <img src="/uploads/leeh.png" alt="Leticia Lunardi" className={styles['team-photo']} />
            <h3>Leticia Lunardi</h3>
            <a href="https://www.instagram.com/leeh04/?hl=pt-br" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24}/>
            </a>
          </div>
          <div className={styles['team-member']}>
            <img src="/uploads/jhow.png" alt="Jonathan Bortoluzzo" className={styles['team-photo']} />
            <h3>Jonathan Bortoluzzo</h3>
            <a href="https://www.instagram.com/jbortoluzzo/?hl=pt-br" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles['footer-bar']}>
          <p>&copy; EpicPlay 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default SobreNos;