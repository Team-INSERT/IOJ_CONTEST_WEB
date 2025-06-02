import Star from '@/assets/Star';
import React from 'react';

interface OwnProps {
  level: number;
}

const StarStatus = ({ level }: OwnProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star key={i} status={i < level} />
  ));

  return <div className="flex">{stars}</div>;
};

export default StarStatus;
