import React, { Suspense } from 'react';
import { publicRoutes } from '../routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page404 from '../../component/pages/Page404';

const AppRouter: React.FC = () => {
  // const isLoggedIn = useSelector(getIsLoggedIn());
  return (
   <Suspense fallback={<></>}>
    <Router>
      <Routes>
        {publicRoutes.map(route =>
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
