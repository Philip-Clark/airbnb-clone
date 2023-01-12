import { useEffect, useState } from 'react';
import Imgix from 'react-imgix';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const imgIXDomain = 'https://listingthumbnails.imgix.net/';

export default function ListingTile({ data }) {
  const [render, setRender] = useState(true);
  let image = data.picture_url;
  image = image.replace('https://a0.muscache.com/pictures/', '');
  const url = imgIXDomain + image;
  console.log(url);

  if (!render) return;
  return (
    <a className="ListingTile" href="">
      <div className="preview">
        <Imgix
          className="listingImage"
          src={url}
          sizes="250px"
          imgixParams={{
            q: '0',
            auto: 'compress,format',
            ar: '1:1',
            fit: 'crop',
          }}
        />
      </div>

      <div className="title">
        <h4 className="location">
          {data.neighbourhood_cleansed}, {data.neighbourhood_group_cleansed}
        </h4>

        <h4 className="rating">
          <StarRoundedIcon className="ratingIcon" />
          {data.review_scores_rating ? parseFloat(data.review_scores_rating).toPrecision(2) : '--'}
        </h4>
      </div>
      <h4 className="details">
        {data.beds} bed{data.beds > 1 && 's'}, {data.bathrooms_text}
      </h4>
      <h4 className="price">
        {data.price} <span>night</span>
      </h4>
    </a>
  );
}
