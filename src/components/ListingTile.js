import { useEffect, useState } from 'react';
import Imgix from 'react-imgix';

const imgIXDomain = 'https://listingthumbnails.imgix.net/';

export default function ListingTile({ data }) {
  const [render, setRender] = useState(true);
  let image = data.picture_url;
  image = image.replace('https://a0.muscache.com/pictures/', '');
  const url = imgIXDomain + image;
  console.log(url);

  if (!render) return;
  return (
    <a className="ListingTile" href={image}>
      <div className="preview">
        <Imgix
          src={url}
          sizes="400px"
          imgixParams={{ q: '0', auto: 'compress,format', fit: 'min' }}
        />
      </div>

      <h4 className="location">
        {data.neighbourhood_cleansed}, {data.neighbourhood_group_cleansed}
      </h4>
      <h4 className="details">
        {data.beds} bed{data.beds > 1 && 's'}, {data.bathrooms_text}
      </h4>
      <h4 className="price">{data.price} night</h4>
    </a>
  );
}
