import { motion } from 'framer-motion';
import { Piece, PIECE_SYMBOLS } from '@/types/game';
import { cn } from '@/lib/utils';

interface ChessPieceProps {
  piece: Piece;
  isSelected?: boolean;
  isWinning?: boolean;
  onClick?: () => void;
  animate?: boolean;
  pieceId?: string; // Unique ID for layout animations
}

export const ChessPiece = ({
  piece,
  isSelected = false,
  isWinning = false,
  onClick,
  animate = true,
  pieceId,
}: ChessPieceProps) => {
  return (
    <motion.div
      layoutId={pieceId}
      initial={animate ? { scale: 0.5, opacity: 0 } : false}
      animate={{
        scale: 1,
        opacity: 1,
        y: isWinning ? [0, -5, 0] : 0,
      }}
      transition={{
        layout: { type: 'spring', stiffness: 400, damping: 30, duration: 0.15 },
        scale: { duration: 0.1 },
        opacity: { duration: 0.1 },
        y: isWinning ? { repeat: Infinity, duration: 0.8 } : undefined,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'text-5xl md:text-6xl cursor-pointer select-none transition-all duration-100',
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
