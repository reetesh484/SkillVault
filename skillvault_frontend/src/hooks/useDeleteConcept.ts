import { api } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// export function useDeleteConcept = (id:number) => {
//     const queryClient = useQueryClient();
//      const deleteMutation = useMutation({
//         mutationFn: (id: number) => api.delete(`/concepts/${id}/`),

//         onMutate: async (id: number) => {
//           await queryClient.cancelQueries({ queryKey: ["concepts"] });

//           const prevData = queryClient.getQueriesData({ queryKey: ["concepts"] });

//           queryClient.setQueriesData({ queryKey: ["concepts"] }, (old: any) => {
//             if (!old) return old;

//             return {
//               ...old,
//               // results: old.results.filter((concept: Concept) => concept.id !== id),
//               // count: old.count - 1,
//               pages: old.pages.map((page: any) => {
//                 return {
//                   ...page,
//                   results: page.results.filter(
//                     (concept: Concept) => concept.id !== id
//                   ),
//                   count: page.count - 1,
//                 };
//               }),
//             };
//           });

//           return { prevData };
//         },

//         onError: (_err, _id, context) => {
//           context?.prevData.forEach(([key, data]) => {
//             queryClient.setQueryData(key, data);
//           });
//           toast.error("Delete failed. Restored item.");
//         },

//         onSuccess: () => {
//           // queryClient.invalidateQueries({ queryKey: ["concepts"] });
//         },
//       });

//       return deleteMutation;
// }

export const useDeleteConcept = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/concepts/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concepts"] });
    },
  });
};
