"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

// Form validation schema
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"), // RFC limit
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters") // More secure
    .max(128, "Password is too long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur", // Validate on blur events
    reValidateMode: "onBlur", // Re-validate on blur after first validation
    defaultValues: {
      email: process.env.NODE_ENV === "development" ? "dev@example.com" : "",
      password: process.env.NODE_ENV === "development" ? "dev123" : "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // TODO: Add actual authentication logic here
      // For now, just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/lobby");
    } catch (error) {
      console.error("Sign in error:", error);
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="from-background to-muted flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 sm:p-8">
      <div className="w-full max-w-sm space-y-6 sm:max-w-md sm:space-y-8">
        <header className="space-y-2 px-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome to Mahjong Online
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Play Mahjong Online with Friends
          </p>
        </header>

        <Card className="mx-auto w-full">
          <CardHeader className="space-y-1 pb-4 sm:pb-6">
            <CardTitle className="text-center text-xl sm:text-2xl">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Mobile-first: Stacked layout for mobile, horizontal for larger screens */}
              <div className="space-y-2">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium sm:w-20 sm:text-right"
                  >
                    Email
                  </Label>
                  <div className="flex-1">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="h-11 w-full text-base sm:h-9 sm:text-sm" // Larger touch targets on mobile
                    />
                  </div>
                </div>
                {errors.email && (
                  <div className="flex flex-col sm:flex-row">
                    <div className="hidden sm:block sm:w-20"></div>
                    <p className="text-destructive flex-1 text-sm sm:ml-4">
                      {errors.email.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium sm:w-20 sm:text-right"
                  >
                    Password
                  </Label>
                  <InputGroup className="flex-1">
                    <InputGroupInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      aria-invalid={errors.password ? "true" : "false"}
                      className="h-11 text-base sm:h-9 sm:text-sm" // Larger touch targets on mobile
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-sm" // Larger touch target for mobile
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="h-9 w-9 sm:h-7 sm:w-7" // Ensure good touch target size
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                {errors.password && (
                  <div className="flex flex-col sm:flex-row">
                    <div className="hidden sm:block sm:w-20"></div>
                    <p className="text-destructive flex-1 text-sm sm:ml-4">
                      {errors.password.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Display authentication error message */}
              {authError && (
                <div className="text-destructive bg-destructive/10 border-destructive/20 rounded-md border p-3 text-center text-sm">
                  {authError}
                </div>
              )}

              <Button
                type="submit"
                className="h-11 w-full text-base font-medium sm:h-10 sm:text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="px-4 text-center">
          <Link
            href="/signup"
            className="text-muted-foreground hover:text-primary inline-block px-1 py-2 text-sm transition-colors" // Larger touch target
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
