import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@c/ui/button";

export default function NotFound() {
  return (
    <div className="text-center">
      {/* 404 Number */}
      <div className="mb-8">
        <span className="text-[10rem] font-bold leading-none text-primary/20">
          404
        </span>
      </div>

      {/* Message */}
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="mb-8 text-muted-foreground">
        {
          "The page you're looking for doesn't exist or has been moved. Let's get you back on track."
        }
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/create-predictions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create predictions
          </Link>
        </Button>
      </div>
    </div>
  );
}
