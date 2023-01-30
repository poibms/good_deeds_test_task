import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addNewFriend, getAuthUserInfo } from '../../../store/users';
import { UserType } from '../../../types/types';
import Button from '../../ui/Button/Button';

type FriendProps = {
  user: UserType,
  currntUser: UserType
}

const Friend: React.FC<FriendProps> = ({user, currntUser}) => {

  const dispatch = useDispatch();
  const addFriend = () => {
    dispatch(addNewFriend(user._id!));
  }
  console.log(currntUser!.friends);
 
  const isFriend = () => {
    const friend = currntUser.friends?.filter((item) => item._id === user._id)
    if (friend?.length! > 0) {
      return true;
    }
    return false;
  }
  

  return (
    <div className='friend_index'>
        {
          !isFriend() ?
          <>
            <div className='friend_image'>
              <img src='https://avatars.dzeninfra.ru/get-zen_doc/1542122/pub_5e32beddfc77ce3ea9c6a13a_5e35e1734e72656569a2fc5c/scale_1200' alt='user-img'/>
            </div>
            <div className='friend_info'>
              <p className='friend_info-name'>{user.username}</p>  
              <Button className='button friend_info-btn' onClick={addFriend}> 
                Добавить в друзья
              </Button>
            </div>
          </>
        :
        <>
            <NavLink to={`../${user._id}`}>
            <div className='friend_image'>
              <img src='https://avatars.dzeninfra.ru/get-zen_doc/1542122/pub_5e32beddfc77ce3ea9c6a13a_5e35e1734e72656569a2fc5c/scale_1200' alt='user-img'/>
            </div>
            </NavLink>
            <div className='friend_info'>
              <p className='friend_info-name'>{user.username}</p>  
            </div>
          </>
        }
    </div>
  )
}

export default Friend;