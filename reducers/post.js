export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "지워닝",
      },
      content: "첫번째 게시글이라고 임의 작성 #고양이 #자고싶당",
      Images: [
        {
          src: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "1번 고양이",
          },
          content: "고양이 귀엽다 너무 귀여운데? 귀엽다 귀여운데?",
        },
        {
          User: {
            nickname: "2번 고야잉",
          },
          content: "입양하세요 사지 마세요",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

//액션 이름을 상수로 빼줌
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터",
  User: {
    id: 3,
    nickname: "뽀야미",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
