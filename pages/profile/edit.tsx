import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useUser } from "@libs/client/useUser";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";

interface IFormData {
  email: string;
  phoneNum: string;
  formErrors: string;
  name: string;
}

interface IEditProfileFailResponse {
  ok: false;
  error: string;
}

interface IEditProfileSuccessResponse {
  ok: true;
}

type EditProfileResponseType =
  | IEditProfileFailResponse
  | IEditProfileSuccessResponse;

const EditProfile: NextPage = () => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.phone) {
      setValue("phoneNum", user.phone);
    }
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponseType>(`/api/users/me`);

  const onValid = ({ email, phoneNum, name }: IFormData) => {
    if (loading) return;
    if (email === "" && phoneNum === "" && name === "") {
      setError("formErrors", { message: "셋 중 하는 꼭 입력해주세요" });
      return;
    }
    editProfile({
      email,
      phoneNum,
      name,
    });
  };

  useEffect(() => {
    if (data && data.ok === false) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form className="py-10 px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          label="name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phoneNum")}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 font-medium text-red-500 block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading.." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
