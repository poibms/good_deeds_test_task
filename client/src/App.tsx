import React from 'react';
import AppLoader from './component/HOC/AppLoader';
import AppRouter from './router/AppRouter/AppRouter';
import './style/style.scss';

function App() {
  return (
   <>
    <AppLoader>
      <AppRouter/>
    </AppLoader>
   </>
    
  );
}

export default App;
