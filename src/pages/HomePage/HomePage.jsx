import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Welcome to the Home Page{' '}
        <span role="img" aria-label="Partying emoji">
          🥳
        </span>
      </h1>
      <p className={css.subtitle}>
        Explore our features and enjoy your stay!
        <span role="img" aria-label="Waving hand emoji">
          👋
        </span>
      </p>
    </div>
  );
};

export default HomePage;