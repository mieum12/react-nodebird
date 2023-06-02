import { useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  // const [id, setId] = useState("");
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);
  // -> 커스텀 훅으로 변환
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  const { logInLoading } = useSelector((state) => state.user);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <InputWrapper>
        <label htmlFor="user-email">EMAIL</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
          style={{ color: "#ff4512", fontSize: "20px" }}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
          autoComplete="off"
          style={{ color: "#ff4512", fontSize: "20px" }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <button className="login-form" htmlType="submit" loading={logInLoading}>
          LOGIN
        </button>
        <Link href="/signup">
          <a>
            <button className="login-form">SIGN UP</button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

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
    font-size: 12px;
    font-weight: bold; //TODO: 왜 안먹지

    &.login-form {
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

const InputWrapper = styled(Form)`
  padding: 10px;
  label {
    color: #ff4512;
    font-size: 20px;
  }
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
