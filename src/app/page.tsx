import Link from "next/link";
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

export default function SignIn() {
  return (
    <div className="from-background to-muted flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Mahjong Online
          </h1>
          <p className="text-muted-foreground">
            Play Mahjong Online with Friends
          </p>
        </header>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/lobby">Sign In</Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/signup"
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
