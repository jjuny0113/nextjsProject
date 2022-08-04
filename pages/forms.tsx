import React from "react";
import {
  DeepRequired,
  FieldErrors,
  FieldErrorsImpl,
  useForm,
} from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const Forms = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onValid = (data: LoginForm) => {
    console.log("invalid");
    // username 있으면
    setError('username',{
        message:"유저가 존재합니다."
    })
  };

  const onInVaild = (errors: FieldErrorsImpl<DeepRequired<LoginForm>>) => {
    console.log("errors", errors);
    reset()
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInVaild)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "Username은 5글짜 이상이여야합니다.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
        className={`${
          Boolean(errors.username?.message) ? "border-red-500" : ""
        }`}
      />

      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "password required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" placeholder="Create Account" />
    </form>
  );
};

export default Forms;
