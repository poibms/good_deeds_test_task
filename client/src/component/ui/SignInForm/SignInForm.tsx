import React, { useMemo } from 'react';
import validatorConfig from './validatorConfig';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import withPassword from '../../HOC/WithPassword';
import { AuthCreds } from '../../../types/types';
import { Form, useForm } from '../../../hooks/useForm';
import InputField from '../InputField/InputField';
import authService from '../../../services/auth.service';

const initialData: AuthCreds = {
  username: '',
  password: '',
};

const SignInForm = () => {

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      await authService.signIn(data);
      // navigate('/')
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => withPassword(InputField), []);

  
  
  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='Email' autoFocus />
        <InputWithPassword name='password' label='Пароль' type='password' />
        <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
          Войти
        </Button>
    </Form>
  )
}

export default SignInForm;