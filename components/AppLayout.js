import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const AppLayout = ({ children }) => {
  //리덕스 사용
  //isLoggedIn이 바뀌면 컴포넌트 알아서 리랜더링
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const dummy = {
  //   nickname: "지워닝",
  //   Post: [],
  //   Followings: [],
  //   Followers: [],
  //   isLoggedIn: false,
  // };

  const menuItems = [
    {
      label: (
        <Link href="/">
          <a>노드버드</a>
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link href="/profile">
          <a>프로필</a>
        </Link>
      ),
      key: "프로필",
    },
    {
      label: <Input.Search />,
      key: "검색창",
    },
    {
      label: (
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      ),
      key: "회원가입",
    },
  ];

  return (
    <div>
      <Global />
      <Menu mode="horizontal" items={menuItems} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
          {/* {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />} */}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://eeeonn.notion.site/8185ec1fc9514196bc184de5db9ad6f8"
            target="_blank"
            rel="noreferrer noopener"
          >
            지원 노션
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

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

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
