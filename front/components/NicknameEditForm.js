import React, {useMemo} from 'react';
import {Form, Input} from "antd";

const NicknameEditForm = () => {

  // const style = useMemo(() => ({marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}), deps)

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
        <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;