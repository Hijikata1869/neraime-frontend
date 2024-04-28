import { UserInput } from "@/types/user";

export const createUser = async (userInput: UserInput) => {
  const { event, nickname, email, password, passwordConfirmation } = userInput;
  event.preventDefault();
  await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users`, {
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
  }).then((res) => {
    if (res.status === 200) {
      console.log("User created");
    } else {
      throw "create failed";
    }
  });
};
