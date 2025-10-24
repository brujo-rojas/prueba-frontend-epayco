import React, { useCallback, useMemo } from 'react';
import { AddItemForm } from './AddItemForm';
import { ItemList } from './ItemList';
import { useItems } from '../../hooks/useItems';
import { useCreatedItems } from '../../hooks/useCreatedItems';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Item } from '../../types';

export const HomePage: React.FC = React.memo(() => {
  const { data: items, error, isLoading } = useItems();
  const {
    showOnlyCreated,
    addCreatedItem,
    showAllItems,
    getItemsToDisplay,
    itemsCount,
  } = useCreatedItems();

  const handleItemAdded = useCallback(
    (newItem: Item) => {
      addCreatedItem(newItem);
    },
    [addCreatedItem]
  );

  const itemsToDisplay = useMemo(() => {
    return getItemsToDisplay(items || []);
  }, [getItemsToDisplay, items]);

  const titleText = useMemo(() => {
    return showOnlyCreated ? `Created Items (${itemsCount})` : 'Items List';
  }, [showOnlyCreated, itemsCount]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Typography variant="p">Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Typography variant="p">Error: {(error as Error).message}</Typography>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        <div className="sticky top-6 z-10">
          <AddItemForm onItemAdded={handleItemAdded} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h2">{titleText}</Typography>

            {showOnlyCreated && (
              <Button onClick={showAllItems}>Show All</Button>
            )}
          </div>

          <ItemList items={itemsToDisplay} />
        </div>
      </div>
    </div>
  );
});
