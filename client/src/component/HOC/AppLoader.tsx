import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDeeds } from '../../store/deeds';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../store/users';

const AppLoader = ({ children }: any) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  console.log(isLoggedIn);

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(getAllDeeds());

  }, [isLoggedIn]);

  if (!usersStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
