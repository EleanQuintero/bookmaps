import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, User } from "lucide-react";

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
}

export const AuthForm = ({ isLoading, isSignUp }: AuthFormProps) => {
  return (
    <form className="space-y-4">
      {isSignUp && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Full Name"
              className="pl-9 bg-background/50"
              required={isSignUp}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
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
            type="password"
            placeholder="Password"
            className="pl-9 bg-background/50"
            required
          />
        </div>
      </div>

      <Button className="w-full mt-2" type="submit" disabled={isLoading}>
        {isLoading
          ? isSignUp
            ? "Creating account..."
            : "Signing in..."
          : isSignUp
          ? "Create account"
          : "Sign In"}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
};
