import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';
import Container from '../common/Container/Container';
import Button from '../ui/Button/Button';

const Page404 = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const navigate = useNavigate();
  const goHome = () => {
    if(isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login/signIn')
    }
  };

  return (
    <>
      <Container>
        <main className='main-page404'>
          <h2 className='page404__title'>404 Страница не найдена :(</h2>
          <Button className='button' onClick={goHome}>
            На главную
          </Button>
        </main>
      </Container>
    </>
  );
};

export default Page404;
