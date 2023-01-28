import React from 'react';
import { useParams } from 'react-router-dom';
import SignInPage from '../component/pages/SignInPage';
import SignUpPage from '../component/pages/SignUpPage';

const SignLayout: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  console.log(type)
  return (
    <div className='flex justify-center sign_wrapper'>
        { type === 'signUp' ? <SignUpPage/> : <SignInPage/> }
    </div>
  )
}

export default SignLayout;