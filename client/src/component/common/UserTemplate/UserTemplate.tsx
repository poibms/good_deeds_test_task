
import { Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../hooks/useForm';
import { deleteUser, getAuthErrors, updateUserData } from '../../../store/users';
import { UserType, userUpdateCreds } from '../../../types/types';
import Button from '../../ui/Button/Button';
import InputField from '../../ui/InputField/InputField';
import BasicModal from '../../ui/Modal/Modal';
import validatorConfig from './validatorConfig';

const initialData: userUpdateCreds = {
  username: '',
};

const UserTemplate: React.FC<{ user: UserType }> = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();


  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(updateUserData(data));
      handleResetForm(e);
    }
  };

  const deleteAcc = async () => {
    dispatch(deleteUser())
  }

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
            <Button className='user_btn button' onClick={handleOpen}>
              Изменить аккаунт
            </Button>
            <Button className='user_btn button' onClick={deleteAcc}>
              Удалить аккаунт
            </Button>
          </div>
        </div>
      </div>

      <BasicModal open={open} handleClose={handleClose}>
        <div className="sign_form-wrapper">
          <Paper elevation={3} className='login_form-card form_card'>
            <h2>Изменить аккаунт</h2>
            <Form data={data} errors={errors} handleChange={handleInputChange}>
              <InputField name='username' label='Username' autoFocus />
              <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
                Изменить
              </Button>
            </Form>
            {loginError && <p className='form__enter-error'>{loginError}</p>}
          </Paper>
        </div>
      </BasicModal>
    </section>
  )
}

export default UserTemplate;