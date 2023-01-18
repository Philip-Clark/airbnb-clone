import Imgix from 'react-imgix';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const imgIXDomain = 'https://listingthumbnails.imgix.net/';
const imgixParams = {
  q: '0',
  auto: 'compress,format',
  ar: '1:0.95',
  fit: 'crop',
};

export default function ListingTile({ data }) {
  const url = imgIXDomain + data.picture_url.replace('https://a0.muscache.com/', '');
  const rating = data.review_scores_rating
    ? parseFloat(data.review_scores_rating).toPrecision(2)
    : '--';

  return (
    <Link to={`listing/${data.id}`} style={{ textDecoration: 'none' }}>
      <Tile>
        <Preview>
          <Imgix imgixParams={imgixParams} className="listingImage" src={url} sizes="250px" />
        </Preview>
        <Title>
          <Location>
            {data.neighbourhood_cleansed}, {data.neighbourhood_group_cleansed}
          </Location>
          <Rating>
            <StarRoundedIcon className="ratingIcon" />
            {rating}
          </Rating>
        </Title>

        <Details>
          {data.beds} bed, {data.bathrooms_text}
        </Details>
        <Price>
          {data.price} <span>night</span>
        </Price>
      </Tile>
    </Link>
  );
}

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1.2;
  color: black;
  text-decoration: none;
`;

const Price = styled.h4`
  padding-top: 1em;
  span {
    font-weight: 400;
  }
`;
const Details = styled.h4`
  font-weight: 400;
  color: #717171;
`;
const Location = styled.h4`
  font-weight: 600;
`;
const Rating = styled.h4`
  flex-wrap: nowrap;
  flex-shrink: 0;
  align-self: flex-start;
  width: fit-content;
  text-overflow: clip;

  .ratingIcon {
    font-size: 1em !important;
  }
`;
const Title = styled.h4`
  padding-top: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Preview = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  border-radius: 1em;
  aspect-ratio: 1 / 0.95;
  background: rgb(192, 192, 192);
  overflow: hidden;

  .listingImage {
    margin: 0;
    object-fit: cover;
    object-position: center;
  }
`;
