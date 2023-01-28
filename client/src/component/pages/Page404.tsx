import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container/Container';
import Button from '../ui/Button/Button';

const Page404 = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
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
