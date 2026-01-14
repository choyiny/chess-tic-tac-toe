import { motion } from 'framer-motion';
import { Piece, PieceType, Player } from '@/types/game';
import { cn } from '@/lib/utils';

interface ChessPieceProps {
  piece: Piece;
  isSelected?: boolean;
  isWinning?: boolean;
  onClick?: () => void;
  animate?: boolean;
  pieceId?: string; // Unique ID for layout animations
}

const getPieceImage = (type: PieceType, player: Player): string => {
  return `/pieces/${player}-${type}.svg`;
};

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
        'cursor-pointer select-none transition-all duration-100 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14',
        isSelected && 'drop-shadow-[0_0_12px_hsl(var(--gold))]',
        isWinning && 'drop-shadow-[0_0_16px_hsl(var(--gold-glow))]'
      )}
    >
      <img
        src={getPieceImage(piece.type, piece.player)}
        alt={`${piece.player} ${piece.type}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
};
