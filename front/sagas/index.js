//saga effect알아보기!!
import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
  console.log("root saga연결");
}
