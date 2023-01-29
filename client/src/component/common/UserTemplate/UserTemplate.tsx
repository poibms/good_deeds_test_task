import React from 'react';
import { UserType } from '../../../types/types';
import Button from '../../ui/Button/Button';

const UserTemplate: React.FC<{ user: UserType }> = ({ user }) => {
  console.log(user)
  return (
    <section className='mg-btm-70'>
        <div className='user_wrapper flex flex_row'>
          <div className='user_image'>
            <img src='https://avatars.dzeninfra.ru/get-zen_doc/1542122/pub_5e32beddfc77ce3ea9c6a13a_5e35e1734e72656569a2fc5c/scale_1200' alt='user-img'/>
          </div>
          <div className='user_info'>
            <div className='flex flex_column'>
              <p className='user_info-name'>{user.username}</p>
            </div>
            
            <div className='flex flex_column'>
              <Button className='user_btn button'>
                Изменить аккаунт
              </Button>
              <Button className='user_btn button'>
                Удалить аккаунт
              </Button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default UserTemplate;