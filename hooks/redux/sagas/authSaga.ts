// redux/sagas/authSaga.js
import { call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import { useUserStore } from "@/hooks/store/use-store";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginAction {
  type: "LOGIN_REQUEST";
  payload: LoginPayload;
}

function* loginSaga(action: LoginAction) {
  try {
    const res: Response = yield call(fetch, "/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data: unknown = yield res.json();
    const { username, id, role, fullName } = data?.data;

    // Update Zustand store
    useUserStore.getState().setUser({ username, id, role, fullName });

    // Save in sessionStorage
    sessionStorage.setItem(
      "userData",
      JSON.stringify({ username, id, role, fullName })
    );

    // Navigate
    yield call(Router.push, "/my-books");
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
}

export function* authWatcherSaga() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
}
