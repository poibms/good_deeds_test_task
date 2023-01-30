import { Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../hooks/useForm';
import { addNewDeed, getDeedsErrors } from '../../../store/deeds';
import { DeedCreds } from '../../../types/types';
import Button from '../../ui/Button/Button';
import InputField from '../../ui/InputField/InputField';
import BasicModal from '../../ui/Modal/Modal';
import validatorConfig from './validatorConfig';

const initialData: DeedCreds = {
  title: '',
  description: '',
};

const PostList = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const deedsError = useSelector(getDeedsErrors());
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(addNewDeed(data));
      handleResetForm(e);
      handleClose();
    }
  };


  return (
    <>
      <div className='main'>
        <h1 className='main_title'>Добрые дела</h1>
        <Button className='button' onClick={handleOpen}>
          Добавить новое дело
        </Button>
      </div>

      
      <BasicModal open={open} handleClose={handleClose}>
        <div className="sign_form-wrapper">
          <Paper elevation={3} className='login_form-card form_card'>
            <h2>Изменить аккаунт</h2>
            <Form data={data} errors={errors} handleChange={handleInputChange}>
              <InputField name='title' label='Title' autoFocus />
              <InputField name='description' label='Description' autoFocus />
              <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
                Создать запись
              </Button>
            </Form>
            {deedsError && <p className='form__enter-error'>{deedsError}</p>}
          </Paper>
        </div>
      </BasicModal>
    </>
  )
}

export default PostList;