import { UserInput } from "@/types/user";

export const createUser = async (userInput: UserInput) => {
  const { event, nickname, email, password, passwordConfirmation } = userInput;
  event.preventDefault();
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
  })
    .then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        throw "create failed";
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
