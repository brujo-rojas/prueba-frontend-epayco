import { useState, useCallback, useMemo } from 'react';
import { Item } from '../types';

export const useCreatedItems = () => {
  const [createdItems, setCreatedItems] = useState<Item[]>([]);
  const [showOnlyCreated, setShowOnlyCreated] = useState(false);

  const addCreatedItem = useCallback((item: Item) => {
    setCreatedItems(prev => [item, ...prev]);
    setShowOnlyCreated(true);
  }, []);

  const showAllItems = useCallback(() => {
    setShowOnlyCreated(false);
  }, []);

  const getItemsToDisplay = useCallback(
    (allItems: Item[]) => {
      if (showOnlyCreated) {
        return createdItems;
      }
      return allItems;
    },
    [showOnlyCreated, createdItems]
  );

  const clearCreatedItems = useCallback(() => {
    setCreatedItems([]);
    setShowOnlyCreated(false);
  }, []);

  const itemsCount = useMemo(() => createdItems.length, [createdItems.length]);

  return {
    createdItems,
    showOnlyCreated,
    addCreatedItem,
    showAllItems,
    getItemsToDisplay,
    clearCreatedItems,
    itemsCount,
  };
};
