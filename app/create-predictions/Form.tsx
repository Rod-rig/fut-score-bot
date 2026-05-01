"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar, ChevronRight, Clock, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@c/ui/select";
import { Button } from "@c/ui/button";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@c/ui/form";
import Flag from "@c/shared/Flag";
import { Badge } from "@c/ui/badge";
import { formatCustomDate } from "@u/formatCustomDate";
import { createPrediction } from "./actions";

const upcomingMatches = [
  {
    id: "1",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    league: "Premier League",
    date: "2026-04-28",
    time: "17:30",
    predictions: 45,
    homeTeamShort: "MUN",
    awayTeamShort: "LIV",
  },
  {
    id: "2",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    date: "2026-04-28",
    time: "21:00",
    predictions: 78,
    homeTeamShort: "RMA",
    awayTeamShort: "BAR",
  },
  {
    id: "3",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    date: "2026-04-29",
    time: "18:30",
    predictions: 32,
    homeTeamShort: "BAY",
    awayTeamShort: "BVB",
  },
  {
    id: "4",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    league: "Serie A",
    date: "2026-04-29",
    time: "20:45",
    predictions: 56,
    homeTeamShort: "INT",
    awayTeamShort: "ACM",
  },
  {
    id: "5",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Olympique Marseille",
    league: "Ligue 1",
    date: "2026-04-30",
    time: "21:00",
    predictions: 41,
    homeTeamShort: "PSG",
    awayTeamShort: "OLM",
  },
];

export default function Form({
  events,
  userId,
}: {
  events: any[];
  userId: string;
}) {
  const FormSchema = z.strictObject(
    events.reduce(
      (acc, item) => ({ ...acc, [item.id]: z.optional(z.string()) }),
      {},
    ),
  );
  console.log(events);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createPrediction(data, userId);
  };
  return (
    <UIForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 bg-primary/10 text-primary"
          >
            Gameweek 30
          </Badge>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Upcoming <span className="text-primary">Matches</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select a match to make your prediction
          </p>
        </div>

        {/* Matches List */}
        <div className="space-y-3">
          {events.map((match) => {
            const { date, hours } = formatCustomDate(match.startDate);
            return (
              <Link
                key={match.id}
                href={`/events/${match.id}`}
                className="group flex items-center rounded-xl border border-border/40 bg-card/50 p-4 transition-all hover:border-primary/50 hover:bg-card sm:p-6"
              >
                {/* Date/Time Column */}
                <div className="hidden w-40 shrink-0 flex-col items-center border-r border-border/40 pr-6 sm:flex">
                  <span className="text-sm font-medium text-foreground">
                    {date}
                  </span>
                  <span className="mt-1 text-lg font-bold text-primary">
                    {hours}
                  </span>
                </div>

                {/* Mobile Date */}
                <div className="mr-4 flex w-16 shrink-0 flex-col items-center sm:hidden">
                  <span className="text-xs text-muted-foreground">{date}</span>
                  <span className="text-sm font-bold text-primary">
                    {hours}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex flex-1 items-center justify-center gap-3 sm:gap-6">
                  {/* Home Team */}
                  <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
                    <Flag name={match.flagHome} />
                    <span className="text-right text-sm font-medium text-foreground sm:text-base">
                      {match.home}
                    </span>
                  </div>

                  {/* VS */}
                  <div className="">
                    <FormField
                      control={form.control}
                      name={match.id.toString()}
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Select prediction" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {match.odd?.zeroZero && (
                                <SelectItem value="0:0">
                                  0:0 = {match.odd.zeroZero}pts
                                </SelectItem>
                              )}
                              {match.odd?.oneOne && (
                                <SelectItem value="1:1">
                                  1:1 = {match.odd.oneOne}pts
                                </SelectItem>
                              )}
                              {match.odd?.twoTwo && (
                                <SelectItem value="2:2">
                                  2:2 = {match.odd.twoTwo}pts
                                </SelectItem>
                              )}
                              {match.odd?.oneZero && (
                                <SelectItem value="1:0">
                                  1:0 = {match.odd.oneZero}pts
                                </SelectItem>
                              )}
                              {match.odd?.twoZero && (
                                <SelectItem value="2:0">
                                  2:0 = {match.odd.twoZero}pts
                                </SelectItem>
                              )}
                              {match.odd?.threeZero && (
                                <SelectItem value="3:0">
                                  3:0 = {match.odd.threeZero}pts
                                </SelectItem>
                              )}
                              {match.odd?.twoOne && (
                                <SelectItem value="2:1">
                                  2:1 = {match.odd.twoOne}pts
                                </SelectItem>
                              )}
                              {match.odd?.threeOne && (
                                <SelectItem value="3:1">
                                  3:1 = {match.odd.threeOne}pts
                                </SelectItem>
                              )}
                              {match.odd?.threeTwo && (
                                <SelectItem value="3:2">
                                  3:2 = {match.odd.threeTwo}pts
                                </SelectItem>
                              )}
                              {match.odd?.zeroOne && (
                                <SelectItem value="0:1">
                                  0:1 = {match.odd.zeroOne}pts
                                </SelectItem>
                              )}
                              {match.odd?.zeroTwo && (
                                <SelectItem value="0:2">
                                  0:2 = {match.odd.zeroTwo}pts
                                </SelectItem>
                              )}
                              {match.odd?.zeroThree && (
                                <SelectItem value="0:3">
                                  0:3 = {match.odd.zeroThree}pts
                                </SelectItem>
                              )}
                              {match.odd?.oneTwo && (
                                <SelectItem value="1:2">
                                  1:2 = {match.odd.oneTwo}pts
                                </SelectItem>
                              )}
                              {match.odd?.oneThree && (
                                <SelectItem value="1:3">
                                  1:3 = {match.odd.oneThree}pts
                                </SelectItem>
                              )}
                              {match.odd?.twoThree && (
                                <SelectItem value="2:3">
                                  2:3 = {match.odd.twoThree}pts
                                </SelectItem>
                              )}
                              {match.odd?.anyOther && (
                                <SelectItem value="Any Other">
                                  Any Other = {match.odd.anyOther}pts
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-1 items-center gap-2 sm:gap-4">
                    <span className="text-sm font-medium text-foreground sm:text-base">
                      {match.away}
                    </span>
                    <Flag name={match.flagAway} />
                  </div>
                </div>

                {/* Meta & CTA */}
                <div className="ml-4 hidden shrink-0 items-center gap-6 border-l border-border/40 pl-6 sm:flex">
                  <div className="flex flex-col items-center">
                    <Badge variant="outline" className="mb-1 text-xs">
                      {match.tournament}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      15
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                {/* Mobile CTA */}
                <div className="ml-2 sm:hidden">
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
          <Button type="submit" className="cursor-pointer">
            Send Prediction
          </Button>
        </div>

        {/* Empty State Info */}
        {upcomingMatches.length === 0 && (
          <div className="rounded-xl border border-border/40 bg-card/50 p-12 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              No upcoming matches
            </h3>
            <p className="mt-2 text-muted-foreground">
              Check back later for new matches to predict.
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Prediction Deadline
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                All predictions must be submitted at least 5 minutes before
                kickoff. You can edit your prediction until the deadline.
              </p>
            </div>
          </div>
        </div>
      </form>
    </UIForm>
  );
}
