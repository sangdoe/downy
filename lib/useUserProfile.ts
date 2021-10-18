import useSWR from "swr";
import { User } from "../shared/types";

export default function useUserProfile(id: number) {

  const { data, error, mutate: mutateUser } = useSWR<User>(`/api/users/profile/${id}`);

  return {
    data,
    mutateUser,
    error,
    isLoading: !error && !data,
  };
}