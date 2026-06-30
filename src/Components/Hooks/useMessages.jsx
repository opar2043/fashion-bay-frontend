import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useMessages = () => {
  const axiosSecure = useAxios();
  const {
    data: messages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });
  return [messages, refetch, isLoading];
};

export default useMessages;
