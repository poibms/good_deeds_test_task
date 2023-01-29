import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthUserInfo, getUserById } from '../../store/users';
import Container from "../common/Container/Container";
import UserTemplate from '../common/UserTemplate/UserTemplate';

const PersonalPage = () => {

  const { id } = useParams<{ id?: string }>();
  let user =  useSelector(getUserById(id));

  const currentUser = useSelector(getAuthUserInfo());
  

  return (
    <Container>
      { id ? 
        <UserTemplate user={user!}/>
        :
        <UserTemplate user={currentUser}/>
      }
    </Container>
  )
}

export default PersonalPage