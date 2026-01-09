import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, HelpCircle } from 'lucide-react';
import { Player } from '@/types/game';

interface GameHeaderProps {
  currentPlayer: Player;
  onReset: () => void;
  onShowRules: () => void;
}

export const GameHeader = ({ currentPlayer, onReset, onShowRules }: GameHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center gap-4 mb-6"
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold gold-text gold-glow tracking-tight">
          Chess Tic Tac Toe
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mt-1 font-body">
          Align 4 pieces to win
        </p>
      </div>

      {/* Turn indicator & actions */}
      <div className="flex items-center gap-4">
        <motion.div
          key={currentPlayer}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-4 py-2 rounded-full bg-secondary flex items-center gap-2"
        >
          <div
            className={`w-4 h-4 rounded-full ${
              currentPlayer === 'white'
                ? 'bg-player-white shadow-md'
                : 'bg-player-black border border-muted-foreground'
            }`}
          />
          <span className="font-medium text-foreground">
            {currentPlayer === 'white' ? 'Player 1' : 'Player 2'}'s Turn
          </span>
        </motion.div>

        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="rounded-full"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onShowRules}
          className="rounded-full"
        >
          <HelpCircle className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
};
