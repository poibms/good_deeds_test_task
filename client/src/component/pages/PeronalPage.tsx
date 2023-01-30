import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthUserInfo, getUserById } from '../../store/users';
import Container from "../common/Container/Container";
import PostList from '../common/PostsList/PostsList';
import UserTemplate from '../common/UserTemplate/UserTemplate';
import Button from '../ui/Button/Button';

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
      <PostList/>
    </Container>
  )
}

export default PersonalPage