import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SignUpForm from "./signUpForm";
import SignInForm from "./signInForm";

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
    </section>
  );
};
