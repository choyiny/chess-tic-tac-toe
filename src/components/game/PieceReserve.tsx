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
        'flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300',
        isActive ? 'bg-secondary ring-2 ring-game-gold' : 'bg-muted/50 opacity-60'
      )}
    >
      {/* Player label */}
      <div className="text-center">
        <h3 className="font-display text-lg font-semibold gold-text">{playerLabel}</h3>
        <p className={cn(
          'text-sm font-medium',
          player === 'white' ? 'text-player-white' : 'text-muted-foreground'
        )}>
          {playerColor}
        </p>
        {piecesPlaced < 3 && (
          <p className="text-xs text-muted-foreground mt-1">
            Place {3 - piecesPlaced} more piece{3 - piecesPlaced > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Reserve pieces */}
      <div className="flex flex-wrap justify-center gap-2">
        {pieces.map((piece, index) => {
          const isSelected = selectedPiece === piece && isActive;
          const key = `${piece}-${index}`;

          return (
            <motion.button
              key={key}
              whileHover={canPlace ? { scale: 1.15 } : undefined}
              whileTap={canPlace ? { scale: 0.95 } : undefined}
              onClick={() => canPlace && onSelectPiece(piece)}
              disabled={!canPlace}
              className={cn(
                'w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-3xl md:text-4xl transition-all duration-200',
                player === 'white' ? 'piece-white' : 'piece-black',
                'bg-card/50 hover:bg-card',
                isSelected && 'ring-2 ring-game-gold bg-card',
                !canPlace && 'cursor-not-allowed opacity-50'
              )}
              style={{
                textShadow: player === 'white'
                  ? '0 2px 0 hsl(var(--player-white-accent)), 0 4px 8px rgba(0,0,0,0.3)'
                  : '0 2px 0 hsl(var(--player-black-accent)), 0 4px 8px rgba(0,0,0,0.4)',
              }}
            >
              {PIECE_SYMBOLS[piece]}
            </motion.button>
          );
        })}
      </div>

      {pieces.length === 0 && (
        <p className="text-sm text-muted-foreground italic">All pieces on board</p>
      )}
    </motion.div>
  );
};
