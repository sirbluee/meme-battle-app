"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Trophy, Medal, ArrowLeft } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";

const TITLES = [
  "Meme Lord",
  "Giggle Guru",
  "Caption King",
  "Laugh Master",
  "Viral Virtuoso"
];

export default function LeaderboardPage() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setScores(savedScores.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>

        <Card className="p-6">
          {scores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl font-semibold">No scores yet!</p>
              <p className="text-muted-foreground mt-2">Be the first to play and set a high score.</p>
              <Link href="/game">
                <Button className="mt-6">
                  Play Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {scores.slice(0, 10).map((entry, index) => (
                <Card key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {index < 3 ? (
                      <Medal className={`w-6 h-6 ${
                        index === 0 ? "text-yellow-500" :
                        index === 1 ? "text-gray-400" :
                        "text-amber-600"
                      }`} />
                    ) : (
                      <span className="w-6 text-center font-bold">{index + 1}</span>
                    )}
                    <div>
                      <p className="font-semibold">{entry.playerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {TITLES[index % TITLES.length]}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{entry.score} pts</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}