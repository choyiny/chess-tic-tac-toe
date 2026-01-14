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
      className="w-full flex flex-col items-center gap-1 sm:gap-2 mb-2 sm:mb-4"
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold gold-text gold-glow tracking-tight">
          Chess Tic Tac Toe
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-body">
          Align 4 pieces to win
        </p>
      </div>

      {/* Turn indicator & actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <motion.div
          key={currentPlayer}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-secondary flex items-center gap-1.5 sm:gap-2"
        >
          <div
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentPlayer === 'white'
                ? 'bg-player-white shadow-md'
                : 'bg-player-black border border-muted-foreground'
            }`}
          />
          <span className="font-medium text-foreground text-xs sm:text-sm md:text-base">
            {currentPlayer === 'white' ? 'P1' : 'P2'}'s Turn
          </span>
        </motion.div>

        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onShowRules}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        >
          <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </motion.header>
  );
};
