import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../store/users';

const AppLoader = ({ children }: any) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  console.log(isLoggedIn);

  useEffect(() => {
    dispatch(loadUsersList());

  }, [isLoggedIn]);

  if (!usersStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
