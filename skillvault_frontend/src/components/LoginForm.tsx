import { login } from "@/api/auth";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const location = useLocation();
  const { setAccessToken } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      // queryClient.removeQueries({ queryKey: ["me"] });
      setAccessToken(res.data.access);
      navigate(from, { replace: true });
    },
  });

  return (
    <form
      autoSave="on"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        // Use FormData when you only need values at submit time.
        // It reads the form as a unit, not the DOM structure, so it’s less fragile and easier to evolve.
        // Use direct access or React state only when the UI needs values while typing.
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        if (username && password) {
          mutation.mutate({ username, password });
        }
      }}
    >
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          {mutation.isError && (
            <p className="text-red-500">Invalid credentials</p>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
