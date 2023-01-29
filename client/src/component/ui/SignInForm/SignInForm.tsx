import React, { useMemo } from 'react';
import validatorConfig from './validatorConfig';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import withPassword from '../../HOC/WithPassword';
import { AuthCreds } from '../../../types/types';
import { Form, useForm } from '../../../hooks/useForm';
import InputField from '../InputField/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, signIn } from '../../../store/users';

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
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(signIn(data, navigate));
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => withPassword(InputField), []);

  
  
  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name='username' label='Username' autoFocus />
          <InputWithPassword name='password' label='Пароль' type='password' />
          <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
            Войти
          </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  )
}

export default SignInForm;