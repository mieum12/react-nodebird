import { Form, Input } from "antd";
import React from "react";

const NicknameEditForm = () => {
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px",
      }}
    >
      <Input.Search addonBefore="NICKNAME" enterButton="SAVE" />
    </Form>
  );
};

export default NicknameEditForm;
