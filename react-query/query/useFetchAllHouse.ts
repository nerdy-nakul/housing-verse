import { useQuery } from "@tanstack/react-query";

export default function useFetchAllHouse() {
  return useQuery({
    queryKey: ["houses"],
    queryFn: async () => {
      try {
        const response = await fetch("http://192.168.1.5:3000/houses");

        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        console.log("data ->", data);
        return data;
      } catch (error) {
        console.error("Error finding houses info:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}
