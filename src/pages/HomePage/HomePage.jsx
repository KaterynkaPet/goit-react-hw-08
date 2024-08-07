import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Welcome to the Home Page{' '}
      </h1>
      <p className={css.subtitle}>
        Explore our features and enjoy your stay!
      </p>
    </div>
  );
};

export default HomePage;