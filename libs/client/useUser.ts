import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IProfile {
  id: number;
  phone: string;
  email: string | null;
  name: "Anonymous";
  avatar: string | null;
  createAt: string;
  updatedAt: string;
}

interface ISuccessGetProfileData {
  ok: true;
  profile: IProfile;
}

interface IFailGetProfileData {
  ok: false;
}

type GetProfileDataType = ISuccessGetProfileData | IFailGetProfileData;

export const useUser = () => {
  const { data, error } = useSWR<GetProfileDataType>("/api/users/me");

  const router = useRouter();
  useEffect(() => {
    if (data?.ok === false) {
      router.replace("/enter");
    }
  }, [data?.ok, router]);
  if (data?.ok === false) return { user: null, isLoading: !error };
  return { user: data?.profile, isLoading: !data && !error };
};
