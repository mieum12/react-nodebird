import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  //처음 컴포넌트가 마운트 되면(=홈에 오면) 게시글 10개를 바로 불러오기 요청
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  //스크롤이 아래끝쪽에 다달하면 다시 한번 로딩이 되게끔
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY, //얼마나 내려왔는지
        document.documentElement.clientHeight, //회면의 세로 길이
        document.documentElement.scrollHeight //총 길이
      );
      //스크롤을 끝까지 내렸을 때 -> 새로운 게시글 로딩해라
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          //request를 계속 보내지 않게 로딩이 아닐때만 실행되게! 로딩이 끝나야 true가 되니까 실행된다
          dispatch({
            type: LOAD_POSTS_REQUEST,
            // data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    //리턴으로 지워줘야 메모리에 안쌓임
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
