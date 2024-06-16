import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function WovenImageList() {
  return (
    <ImageList sx={{ minWidth:302, maxWidth: 600, height: 450, overflow: 'hidden'}} variant="woven" cols={3} gap={4}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=161&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            className='woven-image'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
    {
        img: 'crowd.jpg',
        title: 'Crowd',
      },
  {
    img: 'celebrating.png',
    title: 'Celebrating',
  },
  {
    img: 'pool.png',
    title: 'Pool',
  },
  {
    img: 'business.png',
    title: 'Business',
  },
  {
    img: 'meeting.png',
    title: 'Chairs',
  },
  {
    img: 'happiness.png',
    title: 'Smiles',
  },
];
