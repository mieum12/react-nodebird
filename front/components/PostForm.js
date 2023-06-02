import { useCallback, useRef, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
import styled from "styled-components";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    if (addPostDone) {
      setText(""); //포스팅이 완료되면 비워주기
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => setText(e.target.value), []);

  //이미지업로드창 띄우기
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onsubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  return (
    <FormWrapper>
      <Form
        style={{ margin: "10px 0 20px" }}
        encType="multipart.form-data"
        onFinish={onsubmit}
      >
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={148}
          placeholder="What is happening?"
        />
        <div>
          <input type="file" multiple hidden ref={imageInput} />
          <ButtonWrapper>
            <button className="post-form" onClick={onClickImageUpload}>
              IMAGE UPLOAD
            </button>
            <button
              className="post-form"
              type="primary"
              style={{ float: "right" }}
              htmlType="submit"
            >
              TWEET
            </button>
          </ButtonWrapper>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </FormWrapper>
  );
};

export default PostForm;

const FormWrapper = styled.div`
  padding: 30px;
  margin: 10px;
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
    font-size: 10px;
    font-weight: bold; //TODO: 왜 안먹지


    &.post-form {
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
