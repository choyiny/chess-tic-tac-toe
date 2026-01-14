import { motion } from 'framer-motion';
import { PieceType, Player, PIECE_SYMBOLS } from '@/types/game';
import { cn } from '@/lib/utils';

interface PieceReserveProps {
  pieces: PieceType[];
  player: Player;
  isActive: boolean;
  selectedPiece: PieceType | null;
  onSelectPiece: (piece: PieceType) => void;
  piecesPlaced: number;
}

export const PieceReserve = ({
  pieces,
  player,
  isActive,
  selectedPiece,
  onSelectPiece,
  piecesPlaced,
}: PieceReserveProps) => {
  const canPlace = isActive && pieces.length > 0;
  const playerLabel = player === 'white' ? 'Player 1' : 'Player 2';
  const playerColor = player === 'white' ? 'White' : 'Black';

  return (
    <motion.div
      initial={{ opacity: 0, x: player === 'white' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 flex-1 lg:flex-initial',
        isActive ? 'bg-secondary ring-2 ring-game-gold' : 'bg-muted/50 opacity-60'
      )}
    >
      {/* Player label */}
      <div className="text-center">
        <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold gold-text">{playerLabel}</h3>
        <p className={cn(
          'text-xs sm:text-sm font-medium',
          player === 'white' ? 'text-player-white' : 'text-muted-foreground'
        )}>
          {playerColor}
        </p>
        {piecesPlaced < 3 && (
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {3 - piecesPlaced} more
          </p>
        )}
      </div>

      {/* Reserve pieces */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {pieces.map((piece, index) => {
          const isSelected = selectedPiece === piece && isActive;
          const key = `${piece}-${index}`;

          return (
            <motion.button
              key={key}
              whileHover={canPlace ? { scale: 1.1 } : undefined}
              whileTap={canPlace ? { scale: 0.95 } : undefined}
              onClick={() => canPlace && onSelectPiece(piece)}
              disabled={!canPlace}
              className={cn(
                'w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-md sm:rounded-lg flex items-center justify-center text-xl sm:text-2xl md:text-4xl transition-all duration-200',
                player === 'white' ? 'piece-white' : 'piece-black',
                'bg-card/50 hover:bg-card',
                isSelected && 'ring-2 ring-game-gold bg-card',
                !canPlace && 'cursor-not-allowed opacity-50'
              )}
              style={{
                textShadow: player === 'white'
                  ? '0 1px 0 hsl(var(--player-white-accent)), 0 2px 4px rgba(0,0,0,0.3)'
                  : '0 1px 0 hsl(var(--player-black-accent)), 0 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              {PIECE_SYMBOLS[piece]}
            </motion.button>
          );
        })}
      </div>

      {pieces.length === 0 && (
        <p className="text-xs sm:text-sm text-muted-foreground italic">All on board</p>
      )}
    </motion.div>
  );
};
