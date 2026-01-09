import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';

interface WinnerModalProps {
  winner: Player | null;
  onPlayAgain: () => void;
}

export const WinnerModal = ({ winner, onPlayAgain }: WinnerModalProps) => {
  if (!winner) return null;

  const playerLabel = winner === 'white' ? 'Player 1' : 'Player 2';
  const playerColor = winner === 'white' ? 'White' : 'Black';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative bg-card p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md mx-4"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-game-gold/30 via-game-gold/10 to-game-gold/30 rounded-3xl blur-xl -z-10" />
          
          {/* Trophy animation */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-6"
          >
            <Trophy className="w-20 h-20 mx-auto gold-text" />
          </motion.div>

          {/* Confetti-like elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 
                    ? 'hsl(var(--game-gold))' 
                    : 'hsl(var(--primary))',
                }}
              />
            ))}
          </div>

          {/* Winner text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold mb-2 gold-text gold-glow"
          >
            Victory!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-foreground mb-2"
          >
            {playerLabel}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-8"
          >
            ({playerColor}) wins the game!
          </motion.p>

          {/* Play again button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onPlayAgain}
              size="lg"
              className="gap-2 bg-gradient-to-r from-game-gold to-primary hover:from-game-gold/90 hover:to-primary/90 text-primary-foreground font-semibold text-lg px-8"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
