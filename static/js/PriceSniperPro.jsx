import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockData = [
  { site: 'Amazon', price: 120, link: 'https://amazon.com/product/1' },
  { site: 'Jumia', price: 99, link: 'https://jumia.com/product/1' },
  { site: 'eBay', price: 110, link: 'https://ebay.com/product/1' }
];

export default function PriceSniperPro() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // In real scenario: fetch from API. Here we simulate.
    const sorted = [...mockData].sort((a, b) => a.price - b.price);
    setResults(sorted);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Price Sniper Pro</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search product e.g., iPhone 14"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Snip Prices</Button>
      </div>
      <div className="grid gap-3">
        {results.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{item.site}</p>
              <p>Price: ${item.price}</p>
              <a
                href={item.link}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Visit Product
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
