import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

function LogoutButton() {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout: logoutFn } = useAuth();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      //   queryClient.removeQueries({ queryKey: ["me"] });
      logoutFn();
      //   navigate("/login", { replace: true });
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
export default LogoutButton;
