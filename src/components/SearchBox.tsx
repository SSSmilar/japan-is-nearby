import React, { useState } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '../types/product';

interface SearchBoxProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  className?: string;
}

const SearchBox = ({ products, onProductSelect, className }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (product: Product) => {
    onProductSelect(product);
    setSearchQuery('');
    setIsSearching(false);
    setOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearching(false);
      setOpen(false);
    }, 200);
  };

  return (
    <div className={`${className} relative`}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Поиск по названию..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            setIsSearching(!!value);
            setOpen(!!value);
          }}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          className="bg-white"
        />
        {open && filteredProducts && (
          <CommandList>
            <ScrollArea className="h-[200px]">
              {filteredProducts.length === 0 ? (
                <CommandEmpty>Товары не найдены</CommandEmpty>
              ) : (
                <CommandGroup heading="Товары">
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={() => handleSelect(product)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-8 h-8 mr-2 object-cover rounded"
                        />
                        <span>{product.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </ScrollArea>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBox;