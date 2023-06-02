import { Avatar, Card, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Profile>
      <Card
        style={{ fontSize: "30px", background: "#f7f2ef" }}
        actions={[
          <div key="post" style={{ margin: "5px" }}>
            my posts
            <br />
            {me.Posts.length}
          </div>,
          <div key="following" style={{ margin: "5px" }}>
            followings
            <br />
            {me.Followings.length}
          </div>,
          <div key="follower" style={{ margin: "5px" }}>
            followers
            <br />
            {me.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={
            <div style={{ color: "#ff4512", fontSize: "20px" }}>
              {me.nickname}
            </div>
          }
        />
      </Card>
      <ButtonWrapper>
        <button
          className="login-form"
          onClick={onLogOut}
          loading={logOutLoading}
        >
          LOGOUT
        </button>
      </ButtonWrapper>
    </Profile>
  );
};

export default UserProfile;

const Profile = styled.div`
  // .ant-card-body {
  //   font-size: 20px;
  // }
  .ant-card-meta-detail {
    // background: blue;
    text-align: center;
    line-height: 47px;
  }
  .ant-card-actions {
    padding: 10px;
    background: #f7f2ef;
  }
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
