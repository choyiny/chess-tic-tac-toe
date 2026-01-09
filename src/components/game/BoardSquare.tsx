import { motion } from 'framer-motion';
import { Piece, Square } from '@/types/game';
import { ChessPiece } from './ChessPiece';
import { cn } from '@/lib/utils';

interface BoardSquareProps {
  row: number;
  col: number;
  piece: Piece | null;
  pieceId?: string;
  isSelected: boolean;
  isValidMove: boolean;
  isCapture: boolean;
  isWinningSquare: boolean;
  onClick: () => void;
}

export const BoardSquare = ({
  row,
  col,
  piece,
  pieceId,
  isSelected,
  isValidMove,
  isCapture,
  isWinningSquare,
  onClick,
}: BoardSquareProps) => {
  const isLight = (row + col) % 2 === 0;

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative aspect-square flex items-center justify-center cursor-pointer transition-all duration-100',
        isLight ? 'board-light' : 'board-dark',
        isSelected && 'selected-piece',
        isWinningSquare && 'ring-4 ring-game-gold ring-inset'
      )}
      whileHover={{ scale: 1.02 }}
    >
      {/* Valid move indicator */}
      {isValidMove && !piece && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="absolute w-1/3 h-1/3 rounded-full valid-move-indicator"
        />
      )}

      {/* Capture indicator */}
      {isCapture && piece && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-2 rounded-full border-4 border-game-capture opacity-60"
        />
      )}

      {/* Piece */}
      {piece && (
        <ChessPiece
          piece={piece}
          pieceId={pieceId}
          isSelected={isSelected}
          isWinning={isWinningSquare}
        />
      )}

      {/* Coordinate labels */}
      {col === 0 && (
        <span className="absolute left-1 top-1 text-xs font-medium opacity-40 font-body">
          {4 - row}
        </span>
      )}
      {row === 3 && (
        <span className="absolute right-1 bottom-1 text-xs font-medium opacity-40 font-body">
          {String.fromCharCode(97 + col)}
        </span>
      )}
    </motion.div>
  );
};
