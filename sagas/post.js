import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data); //action에서 data를 꺼내서 addPostAPI의 data로 간다
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data, //성공 결과가 담김
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.data, //실패 결과가 담김
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
      data: action.data, //성공 결과가 담김
    });
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
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)], [fork(watchAddComment)]);
}
