import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button";import Container from "../Container/Container";
;

const Header = () => {
  return (
    <header className="header">
      <Container className={'header__container'}>
        <div className="header__inner">
          <div className="header__logo">
            <h3>Good deeds</h3>
          </div>
          <div className='header-buttons'>
              <NavLink to='/' className='header-buttons-button'>
                <Button className='button'>
                  Личный кабинет
                </Button>
              </NavLink>
              <NavLink to='/friends' className='header-buttons-button'>
                <Button className='button'>
                  Друзья
                </Button>
              </NavLink>
            </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
