import useSWR from "swr";
import { SubCategory } from "../shared/types";
import { fetcher, mutateOption } from "./Fetcher";

export type hookSubCategory = {
  isLoading: boolean;
  data: SubCategory[];
  error: any;
  mutate: (data?: SubCategory[], shouldRevalidate?: boolean) => void;
}

export const useSubCategory = (categoryId: number): hookSubCategory => {
  const { data, error, mutate } = useSWR<SubCategory[]>(`/api/category/sub/${categoryId}`, fetcher, mutateOption);
  return {
    isLoading: !error && !data,
    data: data || [],
    error: error,
    mutate: mutate
  };
}