import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
  deleteUserArg,
} from "@/types/user";

export const createUser = async (userInput: CreateUserInput) => {
  const { nickname, email, password, passwordConfirmation } = userInput;
  // ここでreturnをつけないと、呼び出し元のコンポーネント内でこのPromiseを持つことができない
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users`, {
    method: "POST",
    body: JSON.stringify({
      user: {
        nickname: nickname,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "作成失敗";
    }
  });
};

export const login = async (userInput: LoginUserInput) => {
  const { email, password } = userInput;
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}auth`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "認証失敗";
    }
  });
};

export const fetchCurrentUser = async (accessToken: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}current_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const fetchUser = async (id: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const updateUser = async (updateUserInput: UpdateUserInput) => {
  const { event, id, nickname, email, selfIntroduction, token } =
    updateUserInput;
  event.preventDefault();
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      user: {
        nickname: nickname,
        email: email,
        self_introduction: selfIntroduction,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "更新失敗";
    }
  });
};

export const deleteUser = async (deleteUserArg: deleteUserArg) => {
  const { event, userId, token } = deleteUserArg;
  event.preventDefault();
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "削除失敗";
    }
  });
};

export const userImageUpload = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append("profile_image", file);
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${userId}/image_upload`,
    {
      method: "POST",
      body: formData,
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "投稿できませんでした。";
    }
  });
};
