import React, { useCallback, useMemo } from "react";
import { AddItemForm } from "./AddItemForm";
import { ItemList } from "./ItemList";
import { useItems } from "../../hooks/useItems";
import { useCreatedItems } from "../../hooks/useCreatedItems";
import { Typography } from "../atoms/Typography";
import { Item } from "../../types";

export const HomePage: React.FC = React.memo(() => {
  const { data: items, error, isLoading } = useItems();
  const { showOnlyCreated, addCreatedItem, toggleShowAll, getItemsToDisplay, itemsCount } =
    useCreatedItems();

  const handleItemAdded = useCallback(
    (newItem: Item) => {
      addCreatedItem(newItem);
    },
    [addCreatedItem]
  );

  const itemsToDisplay = useMemo(() => {
    return getItemsToDisplay(items || []);
  }, [getItemsToDisplay, items]);

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
    <div className="max-w-4xl mx-auto min-h-screen">
      <div className="space-y-8">
        <div className="sticky top-0 z-10">
          <AddItemForm onItemAdded={handleItemAdded} />
        </div>

        <div className="max-w-2xl mx-auto px-6">
          {itemsCount > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleShowAll}
                className="text-sky-400 hover:text-sky-600 underline text-sm font-medium transition-colors cursor-pointer"
              >
                {showOnlyCreated ? 'Show Original Items' : 'Show Created Items'}
              </button>
            </div>
          )}

          <ItemList items={itemsToDisplay} />
        </div>
      </div>
    </div>
  );
});
