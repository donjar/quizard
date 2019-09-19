import React from 'react';
import { AutoSizer, Index, List, ListRowRenderer } from 'react-virtualized';

interface IVirtualizedListProps {
  listHeight: number;
  overscanRowCount?: number;
  noRowsRenderer?: () => JSX.Element;
  rowCount: number;
  rowHeight:
    | number
    | (number & ((info: Index) => number))
    | (((params: Index) => number) & number)
    | (((params: Index) => number) & ((info: Index) => number));
  rowRenderer: ListRowRenderer;
  scrollToIndex?: number;
}

export const VirtualizedList: React.FC<IVirtualizedListProps> = ({
  listHeight,
  overscanRowCount,
  noRowsRenderer,
  rowCount,
  rowHeight,
  rowRenderer,
  scrollToIndex
}) => {
  return (
    <>
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            height={listHeight}
            overscanRowCount={overscanRowCount}
            noRowsRenderer={noRowsRenderer}
            rowCount={rowCount}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            scrollToIndex={scrollToIndex}
            width={width}
            style={{ outline: 'none' }}
          />
        )}
      </AutoSizer>
    </>
  );
};
