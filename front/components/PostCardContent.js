import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Button, Input} from 'antd';
import {useSelector} from 'react-redux';

// 첫 번째 게시글 #해시태그 #익스프레스
const PostCardContent = ({postData, editMode, onCancelEdit, onEditPost}) => {
  const {editPostLoading, editPostDone} = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (editPostDone) {
      onCancelEdit();
    }
  }, [editPostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, [editText]);

  return (
    <div>
      {editMode
        ? (
          <>
            <Input.TextArea value={editText} onChange={onChangeText} />
            <Button.Group>
              <Button loading={editPostLoading} onClick={onEditPost(editText)}>수정</Button>
              <Button type="danger" onClick={onCancelEdit}>취소</Button>
            </Button.Group>
          </>
        )
        : postData.split(/(#[^\s#]+)/g).map((v) => {
          if (v.match(/(#[^\s#]+)/)) {
            return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}>{v}</Link>;
          }
          return v;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelEdit: PropTypes.func.isRequired,
  onEditPost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
