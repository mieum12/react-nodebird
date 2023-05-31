import { useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  //먼저 팔로우중인지 아닌지 구분
  //내 정보를 리덕스에서 가져오고
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  //내 정보가 있고 팔로잉에 포스트 작성자의 아이디가 같으면 = 팔로잉하고있는 사람이다
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    //이미 팔로잉 중인데 버튼을 눌렀다?
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
