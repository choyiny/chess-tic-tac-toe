import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { PIECE_SYMBOLS } from '@/types/game';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal = ({ isOpen, onClose }: RulesModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card p-6 md:p-8 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Title */}
          <h2 className="text-3xl font-display font-bold gold-text mb-6">
            How to Play
          </h2>

          {/* Rules */}
          <div className="space-y-6 text-foreground">
            <section>
              <h3 className="text-lg font-semibold mb-2 gold-text">Objective</h3>
              <p className="text-muted-foreground">
                Be the first to align your four pieces horizontally, vertically, or diagonally.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 gold-text">Placement Phase</h3>
              <p className="text-muted-foreground">
                Players take turns placing pieces on ANY empty square. You must place your first 3 pieces before you can move them.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 gold-text">Movement Phase</h3>
              <p className="text-muted-foreground">
                After placing 3 pieces, you may either place your remaining piece OR move/capture like in regular chess.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 gold-text">Captures</h3>
              <p className="text-muted-foreground">
                Captured pieces are returned to their owner and can immediately be placed again on any empty square.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 gold-text">Piece Movements</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl piece-white">{PIECE_SYMBOLS.pawn}</span>
                  <div>
                    <p className="font-medium">Pawn</p>
                    <p className="text-sm text-muted-foreground">
                      Moves one space forward. Captures diagonally. Reverses direction upon reaching the opposite side.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl piece-white">{PIECE_SYMBOLS.knight}</span>
                  <div>
                    <p className="font-medium">Knight</p>
                    <p className="text-sm text-muted-foreground">
                      Moves in an "L" shape: 2 squares in one direction, then 1 square perpendicular. Can jump over pieces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl piece-white">{PIECE_SYMBOLS.bishop}</span>
                  <div>
                    <p className="font-medium">Bishop</p>
                    <p className="text-sm text-muted-foreground">
                      Moves diagonally any number of squares. Cannot jump over pieces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl piece-white">{PIECE_SYMBOLS.rook}</span>
                  <div>
                    <p className="font-medium">Rook</p>
                    <p className="text-sm text-muted-foreground">
                      Moves horizontally or vertically any number of squares. Cannot jump over pieces.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Got it button */}
          <div className="mt-8">
            <Button onClick={onClose} className="w-full">
              Got it!
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
