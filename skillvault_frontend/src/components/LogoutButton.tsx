import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      navigate("/login", { replace: true });
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
export default LogoutButton;
