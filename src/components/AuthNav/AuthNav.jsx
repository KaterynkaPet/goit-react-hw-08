import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthNav.module.css';

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.acitve);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
      <NavLink className={css.link} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;