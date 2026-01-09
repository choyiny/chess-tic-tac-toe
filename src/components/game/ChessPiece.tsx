import { motion } from 'framer-motion';
import { Piece, PIECE_SYMBOLS } from '@/types/game';
import { cn } from '@/lib/utils';

interface ChessPieceProps {
  piece: Piece;
  isSelected?: boolean;
  isWinning?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export const ChessPiece = ({
  piece,
  isSelected = false,
  isWinning = false,
  onClick,
  animate = true,
}: ChessPieceProps) => {
  return (
    <motion.div
      initial={animate ? { scale: 0, rotate: -180 } : false}
      animate={{
        scale: 1,
        rotate: 0,
        y: isWinning ? [0, -5, 0] : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        y: isWinning ? { repeat: Infinity, duration: 0.8 } : undefined,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'text-5xl md:text-6xl cursor-pointer select-none transition-all duration-200',
        piece.player === 'white' ? 'piece-white' : 'piece-black',
        isSelected && 'drop-shadow-[0_0_12px_hsl(var(--gold))]',
        isWinning && 'drop-shadow-[0_0_16px_hsl(var(--gold-glow))]'
      )}
      style={{
        textShadow: piece.player === 'white'
          ? '0 2px 0 hsl(var(--player-white-accent)), 0 4px 8px rgba(0,0,0,0.3)'
          : '0 2px 0 hsl(var(--player-black-accent)), 0 4px 8px rgba(0,0,0,0.4)',
      }}
    >
      {PIECE_SYMBOLS[piece.type]}
    </motion.div>
  );
};
