import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles, Trophy, Gamepad2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-4xl mx-auto pt-20 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground animate-pulse">
            Meme Generator Battle
          </h1>
          <p className="text-xl text-muted-foreground">
            Create, Caption, Conquer! Battle against AI opponents in this epic meme showdown.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto mt-12">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <Gamepad2 className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Play Now</h2>
                <p className="text-muted-foreground">Start your meme-making journey</p>
                <Link href="/game">
                  <Button className="w-full" size="lg">
                    New Game
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <Trophy className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Leaderboard</h2>
                <p className="text-muted-foreground">See the top meme masters</p>
                <Link href="/leaderboard">
                  <Button className="w-full" variant="outline" size="lg">
                    View Rankings
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
          
          <div className="mt-12">
            <Card className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 justify-center text-primary">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Daily Challenge</h3>
              </div>
              <p className="mt-2 text-muted-foreground">
                Today's Theme: "Work-from-home Fails" - Extra points available!
              </p>
              <Link href="/game?mode=daily">
                <Button className="mt-4" variant="secondary">
                  Accept Challenge
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}