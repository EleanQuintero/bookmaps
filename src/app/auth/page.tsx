"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AuthForm } from "./components/AuthForm";

export default function AuthPage() {
  const [islogin, setIsLogin] = useState(false);

  return (
    <main className="flex flex-col w-full h-screen bg-background text-primary">
      <section className="flex flex-col items-center justify-center flex-1 px-4">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">
              {islogin ? "Create an account" : "Welcome back"}
            </CardTitle>
            <CardDescription className="text-center">
              {islogin
                ? "Enter your details to create your account"
                : "Enter your credentials to access your account"}
            </CardDescription>

            <div className="flex w-full mt-6 bg-muted/50 p-1 rounded-lg border border-border/50">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  !islogin
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  islogin
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <AuthForm isSignUp={islogin} isLoading={false} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
