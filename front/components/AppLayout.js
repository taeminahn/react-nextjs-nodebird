import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd';
import styled, {createGlobalStyle} from 'styled-components';
import {useSelector} from 'react-redux';
import Router, {useRouter} from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
 }
  
  .ant-col:first-child {
    padding-left: 0 !important;
 }
  
    .ant-col:last-child {
    padding-right: 0 !important;
 }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({children}) => {
  const me = useSelector((state) => state.user.me);
  const router = useRouter();
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${encodeURIComponent(searchInput)}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu
        mode="horizontal"
        selectedKeys={[router.pathname]}
        items={[
          {label: <Link href="/">InCutePig</Link>, key: '/'},
          {label: <Link href="/profile">프로필</Link>, key: '/profile'},
          {label: <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            placeholder="해시태그 검색"
          />,
          key: '/search'},
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.incutepig.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by InCutePig
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
