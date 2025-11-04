"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
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
const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(254, "Email is too long"),
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, hyphens, and underscores",
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email:
        process.env.NODE_ENV === "development" ? "newuser@example.com" : "",
      username: process.env.NODE_ENV === "development" ? "newuser" : "",
      password: process.env.NODE_ENV === "development" ? "password123" : "",
      confirmPassword:
        process.env.NODE_ENV === "development" ? "password123" : "",
    },
  });

  const togglePasswordVisibility = () => {
    // Save the current cursor position before changing visibility
    const currentPosition = passwordInputRef.current?.selectionStart || 0;

    setShowPassword(!showPassword);

    // Restore focus and cursor position after the DOM update
    setTimeout(() => {
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
        passwordInputRef.current.setSelectionRange(
          currentPosition,
          currentPosition,
        );
      }
    }, 0);
  };

  const toggleConfirmPasswordVisibility = () => {
    // Save the current cursor position before changing visibility
    const currentPosition =
      confirmPasswordInputRef.current?.selectionStart || 0;

    setShowConfirmPassword(!showConfirmPassword);

    // Restore focus and cursor position after the DOM update
    setTimeout(() => {
      if (confirmPasswordInputRef.current) {
        confirmPasswordInputRef.current.focus();
        confirmPasswordInputRef.current.setSelectionRange(
          currentPosition,
          currentPosition,
        );
      }
    }, 0);
  };

  // Create ref callbacks that work with React Hook Form
  const { ref: passwordRegisterRef, ...passwordRegisterRest } =
    register("password");
  const passwordRef = useCallback(
    (e: HTMLInputElement | null) => {
      passwordRegisterRef(e);
      passwordInputRef.current = e;
    },
    [passwordRegisterRef],
  );

  const { ref: confirmPasswordRegisterRef, ...confirmPasswordRegisterRest } =
    register("confirmPassword");
  const confirmPasswordRef = useCallback(
    (e: HTMLInputElement | null) => {
      confirmPasswordRegisterRef(e);
      confirmPasswordInputRef.current = e;
    },
    [confirmPasswordRegisterRef],
  );

  const onSubmit = async (data: SignUpFormData) => {
    setAuthError(null);
    try {
      console.log("Sign up data:", data);
      // TODO: Add actual registration logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error) {
      console.error("Sign up error:", error);
      setAuthError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="from-background to-muted flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 sm:p-8">
      <div className="w-full max-w-sm space-y-6 sm:max-w-md sm:space-y-8">
        <header className="space-y-2 px-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Join Mahjong Online
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create your account to start playing
          </p>
        </header>

        <Card className="mx-auto w-full">
          <CardHeader className="space-y-1 pb-4 sm:pb-6">
            <CardTitle className="text-center text-xl sm:text-2xl">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
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
                      className="h-11 w-full text-base sm:h-9 sm:text-sm"
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

              {/* Username Field */}
              <div className="space-y-2">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium sm:w-20 sm:text-right"
                  >
                    Username
                  </Label>
                  <div className="flex-1">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      {...register("username")}
                      aria-invalid={errors.username ? "true" : "false"}
                      className="h-11 w-full text-base sm:h-9 sm:text-sm"
                    />
                  </div>
                </div>
                {errors.username && (
                  <div className="flex flex-col sm:flex-row">
                    <div className="hidden sm:block sm:w-20"></div>
                    <p className="text-destructive flex-1 text-sm sm:ml-4">
                      {errors.username.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Password Field */}
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
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...passwordRegisterRest}
                      aria-invalid={errors.password ? "true" : "false"}
                      className="h-11 text-base sm:h-9 sm:text-sm"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="h-9 w-9 sm:h-7 sm:w-7"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium sm:w-20 sm:text-right"
                  >
                    Confirm
                  </Label>
                  <InputGroup className="flex-1">
                    <InputGroupInput
                      id="confirmPassword"
                      ref={confirmPasswordRef}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...confirmPasswordRegisterRest}
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                      className="h-11 text-base sm:h-9 sm:text-sm"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="h-9 w-9 sm:h-7 sm:w-7"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                {errors.confirmPassword && (
                  <div className="flex flex-col sm:flex-row">
                    <div className="hidden sm:block sm:w-20"></div>
                    <p className="text-destructive flex-1 text-sm sm:ml-4">
                      {errors.confirmPassword.message}
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
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="px-4 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary inline-block px-1 py-2 text-sm transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
