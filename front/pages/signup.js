import { useState, useCallback } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import Password from "antd/lib/input/Password";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <meta charSet="utf-8" />
        <title>SIGN UP</title>
      </Head>
      <InputWrapper>
        <Form onFinish={onSubmit} style={{ color: "#ff4512" }}>
          <div>
            <label htmlFor="user-email">EMAIL</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">NICKNAME</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">PASSWORD</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">PASSWORD CHECK</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
          </div>
          <div className="checkbox">
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              Let's go!
            </Checkbox>
            {termError && <ErrorMessage>Please check the box!</ErrorMessage>}
          </div>
          <ButtonWrapper style={{ marginTop: 10 }}>
            <button
              className="sign-form"
              type="primary"
              htmlType="submit"
              loading={signUpLoading}
            >
              SIGN UP
            </button>
          </ButtonWrapper>
        </Form>
      </InputWrapper>
    </AppLayout>
  );
};

export default Signup;

const ErrorMessage = styled.div`
  color: red;
`;

const InputWrapper = styled(Form)`
  label {
    color: #ff4512;
    font-size: 20px;
  }
  input {
    border: none;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .checkbox {
    margin-bottom: 30px;
  }
`;

const ButtonWrapper = styled.div`
  margin: 10px;
  button {
    margin-left: 15px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold; //TODO: 왜 안먹지

    &.sign-form {
      color: #ff4512;
      text-transform: uppercase;
      padding: 1em 1.5em;
      background: #f7f2ef;
      border: 2.5px solid #ff4512;
      border-radius: 0.75em;
      transform-style: preserve-3d;
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFBBAB;
        border-radius: inherit;
        box-shadow: 0 0 0 2px #ff4512, 0 0.625em 0 0 #ECD4CE;
        transform: translate3d(0, 0.75em, -1em);
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
      }
      &:hover {
        background: #ECD4CE;
        transform: translate(0, 0.25em);
        &::before {
          box-shadow: 0 0 0 2px #ff4512, 0 0.5em 0 0 #ECD4CE;
          transform: translate3d(0, 0.5em, -1em);
        }
      }
      &:active {
        background: #ECD4CE;
        transform: translate(0em, 0.75em);
        &::before {
          box-shadow: 0 0 0 2px #ff4512, 0 0 #ECD4CE;
          transform: translate3d(0, 0, -1em);
        }
      }
    }
`;
