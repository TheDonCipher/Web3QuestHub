import React from 'react';

export interface MarketplaceItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
  onClick?: () => void;
}

export default function MarketplaceItemCard({ item, onClick }: MarketplaceItemCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group flex cursor-pointer flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:border-[var(--primary)]/30 hover:shadow-lg dark:bg-white/5 dark:hover:border-[var(--primary)]/40"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      </div>
      <div>
        <p className="font-bold text-theme-primary">{item.name}</p>
        <p className="text-sm text-theme-secondary">{item.price}</p>
      </div>
    </div>
  );
}
