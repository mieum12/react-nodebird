// import shortId from "shortid";
// // import produce from "../util/produce";
// import { produce } from "immer";

// export const initialState = {
//   mainPosts: [
//     {
//       id: 1,
//       User: {
//         id: 1,
//         nickname: "지워닝",
//       },
//       content: "첫번째 게시글이라고 임의 작성 #고양이 #자고싶당",
//       Images: [
//         {
//           id: shortId.generate(),
//           src: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
//         },
//         {
//           id: shortId.generate(),
//           src: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
//         },
//         {
//           id: shortId.generate(),
//           src: "https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg",
//         },
//       ],
//       Comments: [
//         {
//           id: shortId.generate(),
//           User: {
//             id: shortId.generate(),
//             nickname: "1번 고양이",
//           },
//           content: "고양이 귀엽다 너무 귀여운데? 귀엽다 귀여운데?",
//         },
//         {
//           id: shortId.generate(),
//           User: {
//             id: shortId.generate(),
//             nickname: "2번 고야잉",
//           },
//           content: "입양하세요 사지 마세요",
//         },
//       ],
//     },
//   ],
//   // mainPosts: [],
//   imagePaths: [],

//   hasMorePosts: true,

//   loadPostsLoading: false,
//   loadPostsDone: false,
//   loadPostsError: null,

//   addPostLoading: false,
//   addPostDone: false,
//   addPostError: null,

//   removePostLoading: false,
//   removePostDone: false,
//   removePostError: null,

//   addCommentLoading: false,
//   addCommentDone: false,
//   addCommentError: null,
// };

// // export const generateDummyPost = (number) =>
// initialState.mainPosts = initialState.mainPosts.concat(
//   Array(number)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.image(),
//         },
//       ],
//       Comments: [
//         {
//           User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName(),
//           },
//           content: faker.lorem.sentence(),
//         },
//       ],
//     }))
// );

// //액션 이름을 상수로 빼줌
// export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
// export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
// export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

// export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
// export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
// export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

// export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
// export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
// export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

// export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
// export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
// export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

// export const addPost = (data) => ({
//   type: ADD_POST_REQUEST,
//   data,
// });
// export const addComment = (data) => ({
//   type: ADD_COMMENT_REQUEST,
//   data,
// });

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: "eeeonn",
//   },
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   content: data,
//   User: {
//     id: 1,
//     nickname: "eeeonn",
//   },
// });

// //reducer는 이전 상태를 액션을 통해 가음 상태로 만들어내는 함수(불변성은 지키면서)
// const reducer = (state = initialState, action) => {
//   //immer사용하기
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case LOAD_POSTS_REQUEST:
//         draft.loadPostsLoading = true;
//         draft.loadPostsDone = false;
//         draft.loadPostsError = null;
//         break;

//       case LOAD_POSTS_SUCCESS:
//         draft.loadPostsLoading = false;
//         draft.loadPostsDone = true;
//         draft.mainPosts = action.data.concat(draft.mainPosts);
//         draft.hasMorePosts = draft.mainPosts.length < 50;
//         break;

//       case LOAD_POSTS_FAILURE:
//         draft.loadPostsLoading = false;
//         draft.loadPostsError = action.error;
//         break;

//       case ADD_POST_REQUEST:
//         draft.addPostLoading = true;
//         draft.addPostDone = false;
//         draft.addPostError = null;
//         break;

//       case ADD_POST_SUCCESS:
//         draft.addPostLoading = false;
//         draft.addPostDone = true;
//         draft.mainPosts.unshift([dummyPost(action.data)]);
//         break;

//       case ADD_POST_FAILURE:
//         draft.addPostLoading = false;
//         draft.addPostError = action.error;
//         break;

//       case REMOVE_POST_REQUEST:
//         draft.removePostLoading = true;
//         draft.removePostDone = false;
//         draft.removePostError = null;
//         break;

//       case REMOVE_POST_SUCCESS:
//         draft.removePostLoading = false;
//         draft.removePostDone = true;
//         draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
//         break;

//       case REMOVE_POST_FAILURE:
//         draft.removePostLoading = false;
//         draft.removePostError = action.error;
//         break;

//       case ADD_COMMENT_REQUEST:
//         draft.addCommentLoading = true;
//         draft.addCommentDone = false;
//         draft.addCommentError = null;
//         break;

//       case ADD_COMMENT_SUCCESS: {
//         //불변성 : 바뀌는걸 새로운 객체로, 나머지는 참조 유지
//         //댓글을 달 때는 is로 post를 찾고 -> Comment를 찾아서 등록해주기
//         //인덱스 찾기
//         // const postIndex = state.mainPosts.findIndex(
//         //   (v) => v.id === action.data.postId
//         // );
//         // //게시글 찾기
//         // const post = { ...state.mainPosts[postIndex] };
//         // post.Comments = [dummyComment(action.data.content), ...post.Comments];
//         // const mainPosts = [...state.mainPosts];
//         // mainPosts[postIndex] = post;
//         // return {
//         //   ...state,
//         //   mainPosts,
//         //   addCommentLoading: false,
//         //   addCommentDone: true,
//         // };

//         //이 부분때문에 immer사용한것!!(immer가 불변성을 유지해줌)
//         const post = draft.mainPosts.find((v) => v.id === action.data.postId); //게시글 찾기
//         post.Comments.unshift(dummyComment(action.data.content)); //게시글에 새로운 것 추가해준다
//         draft.addCommentLoading = false;
//         draft.addCommentDone = true;
//         break;
//       }
//       case ADD_COMMENT_FAILURE:
//         draft.addCommentLoading = false;
//         draft.addCommentError = action.error;
//         break;

//       default:
//         break;
//     }
//   });
// };

// export default reducer;

//
//
//
//
import shortId from "shortid";
import faker from "faker";
// import produce from "../util/produce";
import { produce } from "immer";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "eeeonn",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "eeeonn",
  },
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
