import { useCallback, useRef, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

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
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart.form-data"
      onFinish={onsubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={148}
        placeholder="무슨 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
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
  );
};

export default PostForm;
