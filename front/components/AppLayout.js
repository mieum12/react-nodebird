import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
// import { Menu, Input, Row, Col } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const AppLayout = ({ children }) => {
  //리덕스 사용
  //me이 바뀌면 컴포넌트 알아서 리랜더링
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const menuItems = [
  //   {
  //     label: (
  //       <Link href="/">
  //         <a style={{ color: "#ff4512" }}>LIFE RECAP</a>
  //       </Link>
  //     ),
  //     key: "home",
  //   },
  //   {
  //     label: (
  //       <Link href="/profile">
  //         <a style={{ color: "#ff4512" }}>PROFILE</a>
  //       </Link>
  //     ),
  //     key: "프로필",
  //   },
  //   // {
  //   //   label: <Input.Search />,
  //   //   key: "검색창",
  //   // },
  //   {
  //     label: (
  //       <Link href="/signup">
  //         <a style={{ color: "#ff4512" }}>JOIN</a>
  //       </Link>
  //     ),
  //     key: "회원가입",
  //   },
  // ];

  return (
    <>
      {/* <Global /> */}
      <Header
        style={{
          textAlign: "center",
          fontFamily: "Trirong",
          background: "#f7f2ef",
          height: "200px",
          fontSize: "100px",
          lineHeight: "200px", //세로 가운데정렬
          fontWeight: "bold",
        }}
      >
        <Link href="/">
          <a style={{ color: "#ff4512" }}>📍 LIFE RECAP</a>
        </Link>
      </Header>

      <HeaderNav
        style={{
          textAlign: "right",
          fontFamily: "Trirong",
          background: "#f7f2ef",
          height: "100px",
          lineHeight: "100px", //세로 가운데정렬
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        <Link href="/profile">
          <a style={{ color: "#ff4512", padding: "20px" }}>PROFILE</a>
        </Link>
        <Link href="/signup">
          <a style={{ color: "#ff4512", padding: "20px" }}>SIGN UP</a>
        </Link>
      </HeaderNav>
      <container
        style={{
          display: "flex",
          color: "#ff4512",
          background: "#f7f2ef",
          paddingTop: "50px",
          fontSize: "20px",
          fontFamily: "Trirong",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-evenly",
        }}
      >
        <Col>
          {me ? <UserProfile /> : <LoginForm />}
          {/* {dummy.logInDone ? <UserProfile /> : <LoginForm />} */}
        </Col>
        <Col>{children}</Col>
        <Col>
          <div>Trends for you</div>
          <div>Suggested for you </div>
        </Col>
      </container>
    </>
  );
};

export default AppLayout;

const Header = styled.div`
  //   font-family: "Trirong", serif;
  //   background: #f7f2ef;
  //   height: 200px;
  //   font-size: 100px;
  //   line-height: 200px; //세로 가운데정렬
  //   text-align: center;
  //   font-weight: bold;
`;
const HeaderNav = styled.div`
  // background: #f7f2ef;
  // font-family: "Trirong", serif;
  // height: 100px;
  // line-height: 100px;
  // font-size: 50px;
  // text-align: right;

  // a {
  //   padding: 20px;
  //   :hover {
  //     font-weight: bold;
  //   }
  // }
`;

const Col = styled.div`
  padding: 10px;
`;

// const MenuNav = styled(Menu)`
//   background: #f7f2ef;
//   height: 100px;
//   font-size: 100px;
//   a {
//     :hover {
//       font-weight: bold;
//     }
//   }
// `;

// const SearchInput = styled(Input.Search)`
//   vertical-align: middle;
// `;

// const Global = createGlobalStyle`
// .ant-row {
//   margin-right: 0 !important;
//   margin-left: 0 !important;
// }
// .ant-col:first-child {
//   padding-left: 0 !important;
// }
// .ant-col:last-child {
//   padding-right: 0 !important;
// }
// `;
