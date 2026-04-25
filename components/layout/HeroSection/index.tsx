"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Trophy, Target, Users, Zap } from "lucide-react";
import { Button } from "@c/ui/button";

const HeroSection = () => {
  const { data } = useSession();
  const id = data?.user?.id;

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-100 w-100 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Season 2025/26 Active
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Predict the outcome of{" "}
            <span className="text-primary">football matches</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Compete with friends, make accurate predictions on your favorite
            teams&apos; matches, and climb to the top of the leaderboard.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Link href={`/predictions/${id}/create`}>Start Predicting</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary sm:w-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">2,500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Participants</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">45,000+</p>
              <p className="mt-1 text-sm text-muted-foreground">Predictions</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">120+</p>
              <p className="mt-1 text-sm text-muted-foreground">Matches</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">68%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Top 10 Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
