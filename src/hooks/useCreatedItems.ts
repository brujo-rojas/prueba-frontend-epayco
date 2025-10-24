import { useState, useCallback, useMemo } from 'react';
import { Item } from '../types';

export const useCreatedItems = () => {
  const [createdItems, setCreatedItems] = useState<Item[]>([]);
  const [showOnlyCreated, setShowOnlyCreated] = useState(false);

  const addCreatedItem = useCallback((item: Item) => {
    // Generate unique ID for created items to avoid key conflicts
    const uniqueItem = {
      ...item,
      id: Date.now() + Math.random() // Generate unique ID
    };
    setCreatedItems(prev => [uniqueItem, ...prev]);
    setShowOnlyCreated(true);
  }, []);

  const toggleShowAll = useCallback(() => {
    setShowOnlyCreated(prev => !prev);
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
    toggleShowAll,
    getItemsToDisplay,
    clearCreatedItems,
    itemsCount,
  };
};
