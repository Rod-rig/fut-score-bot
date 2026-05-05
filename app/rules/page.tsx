import { Badge } from "@c/ui/badge";
import {
  Trophy,
  Target,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Star,
  Calendar,
  Users,
} from "lucide-react";

const scoringRules = [
  {
    icon: CheckCircle2,
    title: "Perfect Score",
    points: "Exact score points",
    description: "Predict the exact final score to get the points specified for those odds associated with the score.",
    example: "Prediction: 2-1 | Result: 2-1",
    color: "text-green-500",
  },
  {
    icon: Star,
    title: "Correct Outcome",
    points: "Outcome points",
    description: "Predict the correct winner or draw, but wrong score to get the points associated with the odds for that outcome.",
    example: "Prediction: 2-0 | Result: 3-1 (Home Win)",
    color: "text-blue-500",
  },
  {
    icon: XCircle,
    title: "Incorrect Prediction",
    points: "0 points",
    description: "Wrong match outcome prediction",
    example: "Prediction: 2-1 | Result: 0-2",
    color: "text-red-500",
  },
];

const generalRules = [
  {
    icon: Clock,
    title: "Prediction Deadline",
    description:
      "All predictions must be submitted at least 5 minutes before the official match kickoff time. Late predictions will not be accepted.",
  },
  {
    icon: Target,
    title: "One Prediction Per Match",
    description:
      "Users can only submit one prediction per match.",
      // "Users can only submit one prediction per match. However, predictions can be edited until the deadline.",
  },
  {
    icon: AlertCircle,
    title: "Match Postponements",
    description:
      "If a match is postponed, all predictions remain valid for the rescheduled date. If cancelled, predictions are voided.",
  },
  /*{
    icon: Calendar,
    title: "Season Duration",
    description:
      "Each season runs from August to May, following the traditional European football calendar. Points reset at season start.",
  },*/
  {
    icon: Users,
    title: "Fair Play",
    description:
      "Multiple accounts are prohibited. Violations result in permanent bans and removal from leaderboards.",
  },
];

export default async function Page() {
  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <Badge
          variant="outline"
          className="mb-4 border-primary/50 bg-primary/10 text-primary"
        >
          Official Rules
        </Badge>
        <h1 className="text-4xl font-bold text-foreground">
          How to <span className="text-primary">Play & Win</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Understand the scoring system, deadlines, and rules to maximize your
          prediction success on FutScore.
        </p>
      </div>

      {/* Scoring System */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Scoring System
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {scoringRules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-xl border border-border/40 bg-card/50 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <rule.icon className={`h-6 w-6 ${rule.color}`} />
                  <h3 className="font-semibold text-foreground">
                    {rule.title}
                  </h3>
                </div>
                <Badge className="bg-primary/20 text-primary">
                  {rule.points}
                </Badge>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                {rule.description}
              </p>
              <div className="rounded-lg bg-secondary/30 py-2 text-sm">
                <span className="text-muted-foreground">Example: </span>
                <span className="text-foreground">{rule.example}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Rules */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          General Rules
        </h2>
        <div className="space-y-4">
          {generalRules.map((rule, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/40 bg-card/50 p-6"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <rule.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notes */}
      <section className="mb-16">
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 shrink-0 text-yellow-500" />
            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Points are calculated based on the final score at full-time
                  (90 minutes + injury time)
                </li>
                <li>
                  • Extra time and penalty shootouts do not affect prediction
                  scoring
                </li>
                <li>
                  • Own goals count toward the final score as normal goals
                </li>
                <li>• Abandoned matches are treated on a case-by-case basis</li>
                <li>
                  • FutScore reserves the right to modify rules with prior
                  notice to users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leagues Covered */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Leagues Covered
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            "Premier League",
            "La Liga",
            "Bundesliga",
            "Serie A",
            "Ligue 1",
            "Ukrainian Premier League",
            "Championship",
            "Champions League",
            "Europa League",
            "Conference League",
            "Euro Cup",
            "World Cup",
            "EFL Cup",
            "FA Cup",
            "DFB-Pokal",
            "Copa del Rey",
            "Coppa Italia",
            "Ukrainian Cup",
          ].map((league) => (
            <div
              key={league}
              className="rounded-lg border border-border/40 bg-card/50 px-4 py-3 text-center text-sm font-medium text-foreground"
            >
              {league}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
