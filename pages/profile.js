import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const FollowingList = [
    { nickname: "뽀야미1" },
    { nickname: "뽀야미2" },
    { nickname: "뽀야미3" },
  ];
  const FollowerList = [
    { nickname: "뽀야미1" },
    { nickname: "뽀야미2" },
    { nickname: "뽀야미3" },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <div> 내 프로필 페이지입니다 </div>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={FollowingList} />
        <FollowList header="팔로워 목록" data={FollowerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
