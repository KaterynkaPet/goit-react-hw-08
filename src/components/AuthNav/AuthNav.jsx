import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthNav.module.css';

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink className={getLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={getLinkClass} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;