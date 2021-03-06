import React, { useState } from 'react';
import SignUpFrom from './Components/signupForm';
import { useHistory } from 'react-router-dom';
import Page from './Components/common/common';
import { URL } from '../../config';

function SignUp() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repassword: '',
    text: '',
  });

  const onChange = e => {
    const { value, type } = e.target;
    setInputs({
      ...inputs,
      [type]: value,
    });
  };

  let history = useHistory();

  const smscoderequest = () => {
    fetch(`${URL}/user/smscoderequest`, {
      method: 'POST',
      body: JSON.stringify({
        auth_phone: inputs.text,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.hased_random_code)
          localStorage.setItem('smscode', result.hased_random_code);
      });
  };

  const code = localStorage.getItem('smscode');

  const smscodecheck = () => {
    fetch(`${URL}/user/smscodecheck`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: inputs.text,
        hased_random_code: code,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.auth_token) {
          localStorage.setItem('jwt_token', result.auth_token);
        }
      });
  };

  const visiblePasswordInput = e => {
    const inputSelector = e.target.parentElement.querySelector('input');
    const displayDiv = e.target;
    if (inputSelector.getAttribute('type') === 'password') {
      inputSelector.setAttribute('type', 'text');
      displayDiv.innerText = 'μ¨κΉ';
    } else {
      inputSelector.setAttribute('type', 'password');
      displayDiv.innerText = 'νμ';
    }
  };

  const jwt_token = localStorage.getItem('jwt_token');

  const signUpOk = () => {
    fetch(`${URL}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
        auth_token: jwt_token,
      }),
    }).then(() => {
      fetch(`${URL}/user/signin`, {
        method: 'POST',
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if (result.message === 'SUCCESS_SIGNIN') {
            localStorage.setItem('jwt-token', result.token);
            localStorage.setItem('email', inputs.email);
            history.push('/home');
          }
        });
    });
  };

  return (
    <Page>
      <SignUpFrom
        data={signUp}
        onChange={onChange}
        smscoderequest={smscoderequest}
        smscodecheck={smscodecheck}
        visiblepassword={visiblePasswordInput}
        signUpOk={signUpOk}
      />
    </Page>
  );
}

export default SignUp;

const signUp = {
  type: 'signUp',
  image: false,
  title1: 'κ°νΈνκ² λ‘κ·ΈμΈνκ³ ',
  title2: 'λ€μν μλΉμ€λ₯Ό μ΄μ©νμΈμ.',
  inputData: [
    {
      type: 'email',
      text: 'μ΄λ©μΌ μ£Όμ',
    },
    {
      type: 'password',
      text: 'μλ¬Έ,μ«μ ν¬ν¨ 8μ μ΄μ',
      display: 'νμ',
    },
    {
      type: 'password',
      text: 'λΉλ°λ²νΈ μ¬μλ ₯',
      display: 'νμ',
    },
    {
      type: 'text1',
      text: 'λ¬Έμ μΈμ¦',
      display: 'μμ²­',
    },
    {
      type: 'text2',
      text: 'μ½λ λ²νΈ',
      display: 'μΈμ¦',
    },
  ],
  text: 'μλ£',
};
