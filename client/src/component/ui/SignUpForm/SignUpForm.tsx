import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { AuthCreds } from '../../../types/types';
import withPassword from '../../HOC/WithPassword';
import Button from '../Button/Button';
import validatorConfig from './validatorConfig';
// import authService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField/InputField';
import authService from '../../../services/auth.service';

const initialData: AuthCreds = {
  username: '',
  password: '',
};

const SignUpForm = () => {

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      await authService.signUp(data);
      // navigate('/')
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => withPassword(InputField), []);

  
  
  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='username' label='Username' autoFocus />
        <InputWithPassword name='password' label='Password' type='password' />
        <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
          Зарегистрироваться
        </Button>
    </Form>
  )
}

export default SignUpForm;