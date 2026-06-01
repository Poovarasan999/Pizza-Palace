import { useState } from 'react';

const FALLBACK = '/images/pizzas/pizza-01.jpg';

export default function PizzaImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (imgSrc !== FALLBACK) setImgSrc(FALLBACK);
      }}
    />
  );
}
