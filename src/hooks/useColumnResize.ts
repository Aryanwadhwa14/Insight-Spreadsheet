import { useCallback, useState } from 'react';

export interface ColumnState {
  width: number;
  hidden: boolean;
}

export const useColumnResize = (initialColumns: number) => {
  const [columns, setColumns] = useState<Record<number, ColumnState>>(() => {
    const initial: Record<number, ColumnState> = {};
    for (let i = 0; i < initialColumns; i++) {
      initial[i] = { width: 150, hidden: false };
    }
    return initial;
  });

  const resizeColumn = useCallback((columnIndex: number, width: number) => {
    setColumns((prev) => ({
      ...prev,
      [columnIndex]: {
        ...prev[columnIndex],
        width: Math.max(50, width),
      },
    }));
    console.log(`Column ${columnIndex + 1} resized to ${width}px`);
  }, []);

  const toggleColumnVisibility = useCallback((columnIndex: number) => {
    setColumns((prev) => ({
      ...prev,
      [columnIndex]: {
        ...prev[columnIndex],
        hidden: !prev[columnIndex].hidden,
      },
    }));
    console.log(
      `Column ${columnIndex + 1} ${
        columns[columnIndex].hidden ? 'shown' : 'hidden'
      }`
    );
  }, [columns]);

  return {
    columns,
    resizeColumn,
    toggleColumnVisibility,
  };
};