import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import shortId from "shortid";
import axios from "axios";
import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME } from "../reducers/user";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data); //action에서 data를 꺼내서 addPostAPI의 data로 간다
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      //data = 성공 결과가 담김
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
    console.log("포스트 saga연결");
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.data, //실패 결과가 담김
    });
  }
}

function removePostAPI(data) {
  return axios.delete("/api/post", data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);

    //[action을 2개 사용한다]
    //post reducer조작 부분
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    //user reducer조작 부분
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
    console.log("포스트삭제 saga연결");
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data, //실패 결과가 담김
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data, //입력한 결과, 성공 결과가 담김 -> 다시 reducer의 ADD_COMMENT_SUCCESS로 간다
    });
    console.log("댓글 saga연결");
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.data, //실패 결과가 담김
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
