'use server';
// Define server database interactivity functions and general server side functions here.

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/dummydata')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });

  return (
    
  );
}

