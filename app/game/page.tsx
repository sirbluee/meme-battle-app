"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Timer, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { memeTemplates, generateAICaptions } from "@/lib/meme-templates";
import type { GameState, MemeTemplate } from "@/lib/types";

const ROUND_TIME = 60;
const TOTAL_ROUNDS = 5;

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDaily = searchParams.get("mode") === "daily";
  
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    score: 0,
    timeRemaining: ROUND_TIME,
    playerCaption: "",
    aiCaptions: [],
    currentMeme: null,
    phase: "caption"
  });

  useEffect(() => {
    // Select random meme template
    const randomMeme = isDaily 
      ? memeTemplates[0] // Use first meme for daily challenge
      : memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    
    setGameState(prev => ({
      ...prev,
      currentMeme: randomMeme
    }));
  }, [isDaily]);

  useEffect(() => {
    if (gameState.phase === "caption" && gameState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
    
    if (gameState.timeRemaining === 0 && gameState.phase === "caption") {
      handleCaptionSubmit();
    }
  }, [gameState.timeRemaining, gameState.phase]);

  const handleCaptionSubmit = () => {
    if (!gameState.playerCaption.trim()) {
      toast.error("Please enter a caption!");
      return;
    }

    const aiCaptions = generateAICaptions(3);
    
    setGameState(prev => ({
      ...prev,
      aiCaptions,
      phase: "voting",
      timeRemaining: ROUND_TIME
    }));
  };

  const handleVote = (caption: string) => {
    const isPlayerWinner = Math.random() > 0.5;
    const scoreIncrease = isPlayerWinner ? 100 : 0;
    
    if (isPlayerWinner) {
      toast.success("Your caption won! +100 points");
    } else {
      toast.info("Better luck next round!");
    }

    if (gameState.currentRound === TOTAL_ROUNDS) {
      // Game Over - Save score to leaderboard
      const existingScores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      existingScores.push({
        playerName: "Player",
        score: gameState.score + scoreIncrease,
        date: new Date().toISOString(),
        achievements: []
      });
      localStorage.setItem("leaderboard", JSON.stringify(existingScores));
      
      router.push("/leaderboard");
      return;
    }

    // Next round
    const nextMeme = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      score: prev.score + scoreIncrease,
      timeRemaining: ROUND_TIME,
      playerCaption: "",
      aiCaptions: [],
      currentMeme: nextMeme,
      phase: "caption"
    }));
  };

  if (!gameState.currentMeme) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Round {gameState.currentRound}/{TOTAL_ROUNDS}</h2>
            <p className="text-muted-foreground">Score: {gameState.score}</p>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <Progress value={(gameState.timeRemaining / ROUND_TIME) * 100} className="w-32" />
            <span>{gameState.timeRemaining}s</span>
          </div>
        </div>

        <Card className="p-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={gameState.currentMeme.url}
              alt={gameState.currentMeme.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {gameState.phase === "caption" && (
            <div className="mt-6 space-y-4">
              <Input
                placeholder="Enter your caption..."
                value={gameState.playerCaption}
                onChange={(e) => setGameState(prev => ({
                  ...prev,
                  playerCaption: e.target.value
                }))}
                maxLength={100}
              />
              <Button 
                className="w-full"
                onClick={handleCaptionSubmit}
                disabled={!gameState.playerCaption.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Caption
              </Button>
            </div>
          )}

          {gameState.phase === "voting" && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-bold text-center">Vote for the Best Caption!</h3>
              <div className="space-y-3">
                {[...gameState.aiCaptions, gameState.playerCaption]
                  .sort(() => Math.random() - 0.5)
                  .map((caption, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left h-auto py-4 px-6"
                      onClick={() => caption !== gameState.playerCaption && handleVote(caption)}
                      disabled={caption === gameState.playerCaption}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-2">{caption}</span>
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}