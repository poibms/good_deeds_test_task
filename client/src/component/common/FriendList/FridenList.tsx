import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, getAuthUserInfo, getUserById } from '../../../store/users';
import { UserType } from '../../../types/types';
import Friend from '../Friend/Friend';

const FriendList = ({index}: any) => {

  const allUsers = useSelector(getAllUsers());
  const authUser = useSelector(getAuthUserInfo());

  const currntUser = allUsers.find((user) => user._id === authUser._id)!;
  // console.log(currntUser?.friends);  

  return (
    <div className='friend_wrapper'>
      {
      index == 0 ? 
      allUsers.map((user) => (
        <Friend currntUser={currntUser} user={user} key={user._id}/>
      ))
    :
      currntUser.friends!.map((friend: any) => (
        <Friend currntUser={currntUser} user={friend} key={friend._id}/>
      ))
    }
    </div>
  )
}

export default FriendList;