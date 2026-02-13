interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Loading...",
}: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center p-8 sm:p-20">
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
}
