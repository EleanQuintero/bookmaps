import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import { signUp } from "../actions/auth/auth";
import { useState } from "react";

function SignUpForm({ children }: Readonly<{ children: React.ReactNode }>) {
  const [error, setError] = useState();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data.entries());

    const { username, email, password } = formData;
    const signUpData = {
      username: username as string,
      email: email as string,
      password: password as string,
    };
    const response = await signUp(signUpData);

    if (response?.error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="username"
            placeholder="Full Name"
            className="pl-9 bg-background/50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            className="pl-9 bg-background/50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="pl-9 bg-background/50"
            required
          />
        </div>
      </div>

      {children}
      {error && <p className="text-red-500 font-bold font-lg">{error}</p>}
    </form>
  );
}

export default SignUpForm;
