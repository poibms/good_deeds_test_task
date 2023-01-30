import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../../store/users";
import Button from "../../ui/Button/Button";import Container from "../Container/Container";
;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logOut());
    navigate('/login/signIn');
  }
  
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

              <Button className='button' onClick={signOut}>
                  Выйти
                </Button>
            </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
