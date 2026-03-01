import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SignUpForm from "./signUpForm";
import SignInForm from "./signInForm";
import GoogleAuthButton from "./GoogleAuthButton";

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
}

export const AuthForm = ({ isLoading, isSignUp }: AuthFormProps) => {
  return (
    <section>
      {isSignUp ? (
        <SignUpForm>
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
        </SignUpForm>
      ) : (
        <SignInForm>
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
        </SignInForm>
      )}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleAuthButton />
    </section>
  );
};
