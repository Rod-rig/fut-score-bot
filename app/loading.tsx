import Logo from "@c/shared/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <Logo />

        {/* Spinner */}
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-primary" />
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
