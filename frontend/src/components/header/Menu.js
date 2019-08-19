import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './Menu.module.css';
import iconBurger from './menu.svg';
import iconLogout from './logout.svg';
import { logout } from '../../actions/session-actions';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [open, setOpen] = useState(false);
  const [clickListener, setClickListener] = useState(null);
  const iconElement = useRef(null);
  const navElement = useRef(null);

  useEffect(() => {
    if (!clickListener && iconElement.current && navElement.current) {
      setClickListener(() => {
        const cb = (e) => {
          if (!((navElement.current.contains(e.target)) || iconElement.current.contains(e.target))) {
            setOpen(false);
          }
        };
        document.body.addEventListener('click', cb);
        return cb;
      });
    }
    return () => document.body.removeEventListener('click', clickListener);
  }, [iconElement, navElement, clickListener]);

  return <>
    <div className={styles.iconContainer}>
      <IconBurger ref={iconElement} onClick={() => setOpen((prev) => !prev)}
        className={open ? `${styles.icon} ${styles.open}` : styles.icon}
      />
    </div>
    <nav className={open ? `${styles.menu} ${styles.open}` : styles.menu} ref={navElement}>
      <ul>
        <li>Hi, {user.name}!</li>
        <li onClick={() => dispatch(logout())}>
          <span className={styles.menuText}>Logout </span>
          <IconLogout className={styles.iconLogout}/>
        </li>
      </ul>
    </nav>
  </>
};

const IconBurger = forwardRef((props, ref) => {
  return <img alt="Open menu" title="Open menu"
    src={iconBurger} ref={ref} {...props}
  />
});

const IconLogout = forwardRef((props, ref) => {
  return <img alt="Log out" title="Log out"
    src={iconLogout} ref={ref} {...props}
  />
});

export default Menu;
