import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Link from "next/link";
import {Menu, Input, Row, Col} from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled, {createGlobalStyle} from "styled-components"
import {useSelector} from "react-redux";

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

const AppLayout = ({ children }) => {

  const me = useSelector((state) => state.user.me);

  const menuItems = [
    { label: <Link href="/">노드버드</Link>, key: 'home' },
    { label: <Link href="/profile">프로필</Link>, key: 'profile' },
    { label: <SearchInput enterButton></SearchInput>, key: 'searchInput' },
    { label: <Link href="/signup">회원가입</Link>, key: '회원가입' },
  ]

  return (
    <div>
      <Global />
      <Menu mode="horizontal" items={menuItems}>
        {/*<Menu.Item>*/}
        {/*  <Link href="/" key="home">노드버드</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <Link href="/profile" key="profile">프로필</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <SearchInput enterButton></SearchInput>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <Link href="/signup" key="signup">회원가입</Link>*/}
        {/*</Menu.Item>*/}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >Made by ZeroCho</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;