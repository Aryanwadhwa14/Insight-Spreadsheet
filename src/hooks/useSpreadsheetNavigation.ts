import { useCallback, useEffect, useState } from 'react';

export interface CellPosition {
  row: number;
  col: number;
}

export const useSpreadsheetNavigation = (
  totalRows: number,
  totalCols: number
) => {
  const [selectedCell, setSelectedCell] = useState<CellPosition>({
    row: 0,
    col: 0,
  });
  const [isNavigationActive, setIsNavigationActive] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isNavigationActive) return;

      const { key } = event;
      const { row, col } = selectedCell;

      switch (key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelectedCell({
            row: Math.max(0, row - 1),
            col,
          });
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedCell({
            row: Math.min(totalRows - 1, row + 1),
            col,
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedCell({
            row,
            col: Math.max(0, col - 1),
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelectedCell({
            row,
            col: Math.min(totalCols - 1, col + 1),
          });
          break;
        case 'Enter':
          event.preventDefault();
          console.log(`Cell selected: Row ${row + 1}, Column ${col + 1}`);
          break;
        case 'Escape':
          event.preventDefault();
          setIsNavigationActive(false);
          break;
      }
    },
    [selectedCell, totalRows, totalCols, isNavigationActive]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const activateNavigation = useCallback(() => {
    setIsNavigationActive(true);
  }, []);

  const deactivateNavigation = useCallback(() => {
    setIsNavigationActive(false);
  }, []);

  return {
    selectedCell,
    setSelectedCell,
    isNavigationActive,
    activateNavigation,
    deactivateNavigation,
  };
};