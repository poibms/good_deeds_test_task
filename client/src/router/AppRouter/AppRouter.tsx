import React, { Suspense } from 'react';
import { authRoutes, publicRoutes } from '../routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from '../../component/pages/Page404';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const AppRouter: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
   <Suspense fallback={<></>}>
    <Router>
      <Routes>
        {isLoggedIn ?
            authRoutes.map(route =>
              route.path ? (
                <Route path={route.path} element={<route.component/>} key={route.path} />
              ) : null
        ) : publicRoutes.map(route =>
          route.path ? (
            <Route path={route.path} element={<route.component/>} key={route.path} />
          ) : null
        )}
        <Route path='*' element={<Page404/>} />
      </Routes>
    </Router>
   </Suspense>
  );
};

export default AppRouter;
