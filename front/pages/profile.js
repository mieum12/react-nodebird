import Head from "next/head";
import { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  //로그인이 안되어있는 경우 프로필 페이지 접근 불가(home으로 보내기)
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MY PROFILE</title>
      </Head>
      <AppLayout>
        <div> MY PROFILE </div>
        <NicknameEditForm />
        <FollowList header="Followings" data={me.Followings} />
        <FollowList header="Followers" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
