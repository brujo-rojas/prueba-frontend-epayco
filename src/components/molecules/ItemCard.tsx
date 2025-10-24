import React from 'react';
import { Typography } from '../atoms/Typography';
import { Item } from '../../types';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = React.memo(({ item }) => {
  return (
    <div className="border p-4 mb-4">
      <Typography variant="h3" className="mb-2">
        {item.title}
      </Typography>
      <Typography variant="p" className="mb-2">
        ID: {item.id}
      </Typography>
      <Typography variant="p">{item.body}</Typography>
    </div>
  );
});
