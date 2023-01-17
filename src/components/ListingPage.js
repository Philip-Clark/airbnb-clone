import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { listings } from '../data/listings';
import Imgix from 'react-imgix';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';

const imgIXDomain = 'https://listingthumbnails.imgix.net/';
const imgixParams = {
  q: '100',
  ar: '1:1',
  fit: 'crop',
};

const stripHtml = (string) => {
  return string.replace(/(<([^>]+)>)/gi, '');
};

function ListingPage() {
  const location = useLocation();
  const data = location.state.data;
  const url = imgIXDomain + data.picture_url.replace('https://a0.muscache.com/pictures/', '');
  const hostImageUrl =
    imgIXDomain + data.host_thumbnail_url.replace('https://a0.muscache.com/im/pictures', '');
  const [amenitiesSlice, setAmenitiesSlice] = useState(6);
  const amenities = JSON.parse(data.amenities);

  const hostJoinDateText = new Date(data.host_since);
  const hostJoinYear = hostJoinDateText.getFullYear();
  const hostJoinMonth = Intl.DateTimeFormat('en-US', { month: 'long' }).format(hostJoinDateText);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <StyleWrapped id="ListingPage">
      <Title>{data.name}</Title>
      <TitleSecondLine>
        <Rating>
          {data.review_scores_rating} · {data.number_of_reviews} reviews
        </Rating>
        <Location> · {data.neighbourhood}</Location>
      </TitleSecondLine>

      <ImageGrid>
        <Imgix imgixParams={imgixParams} className="listingImage" src={url} sizes="250px" />
        <div>
          {[0, 0, 0, 0].map((el) => (
            <Imgix imgixParams={imgixParams} className="listingImage" src={url} sizes="250px" />
          ))}
        </div>
      </ImageGrid>
      <Details>
        <BriefDetails>
          <div>
            <h2>
              {data.property_type} hosted by {data.host_name}
            </h2>
            <p>
              {data.accommodates} guests · {data.bedrooms} bedroom· {data.beds} bed ·
              {data.bathrooms_text}
            </p>
          </div>
          <Imgix imgixParams={imgixParams} className="hostImg" src={hostImageUrl} sizes="250px" />
        </BriefDetails>
        <Description>{stripHtml(data.description)}</Description>
        <div>
          <h2>Where you'll sleep</h2>
        </div>
        <div>
          <h2>What this place offers</h2>
          {amenities.slice(0, amenitiesSlice).map((item) => (
            <h3>{item}</h3>
          ))}
          <button
            onClick={() => {
              setAmenitiesSlice(100);
            }}
          >
            Show all {amenities.length} amenities
          </button>
        </div>
        <div></div>
      </Details>

      <Rating> {data.number_of_reviews} reviews</Rating>
      <p>Latest review : {data.last_review}</p>
      <RatingTable>
        <div id="overAll">
          <h2>overall rating:</h2> <h2>{data.review_scores_rating} </h2>
        </div>
        <div>
          <h3>value score:</h3> <h3> {data.review_scores_value}</h3>
        </div>
        <div>
          <h3>location score:</h3> <h3> {data.review_scores_location}</h3>
        </div>
        <div>
          <h3>cleanliness score:</h3> <h3> {data.review_scores_cleanliness} </h3>
        </div>
        <div>
          <h3>listing accuracy score: </h3> <h3>{data.review_scores_accuracy}</h3>
        </div>
        <div>
          <h3>check-in score:</h3> <h3> {data.review_scores_checkin}</h3>
        </div>
        <div>
          <h3>communication score: </h3> <h3>{data.review_scores_communication}</h3>
        </div>
      </RatingTable>
      <div>
        <h2>Where you'll be</h2>
        <iframe
          src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
      <div>
        <img src={data.host_thumbnail_url} />
        <h2>Hosted by {data.host_name}</h2>
        <h3>
          Joined in {hostJoinMonth} {hostJoinYear}
        </h3>
        {data.host_identity_verified === 't' && <h3>Identity verified</h3>}
        {data.host_is_superhost === 't' && <h3>Superhost</h3>}
        <h3>{data.host_listings_count} Host listings</h3>
        <p>{data.host_about}</p>

        {data.host_is_superhost === 't' && (
          <div>
            <h3>{data.host_name} is a Superhost</h3>
            <p>
              Superhosts are experienced, highly rated hosts who are committed to providing great
              stays for guests.
            </p>
          </div>
        )}
      </div>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  color: black;
  max-width: 120ch;
  margin: auto;
  padding: 2em;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5em;
  overflow: hidden;
  border-radius: 1em;

  * {
    transition: filter 0.2s ease;
  }
  img:hover {
    filter: brightness(0.8);
  }

  img {
    width: 100%;
    aspect-ratio: 1;
  }
  div {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Rating = styled.p``;
const Title = styled.h2`
  margin-bottom: 0.5em;
`;
const TitleSecondLine = styled.div`
  display: flex;
  gap: 0.3em;
  margin-bottom: 1em;
`;
const Location = styled.p``;

const Details = styled.div`
  width: 70%;
`;

const BriefDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #dddddd solid;
  padding: 1em 0;
  margin: 1em 0;

  .hostImg {
    flex: 0;
    border-radius: 1000px;
    height: 4em;
  }
`;
const Description = styled.p`
  padding: 1em 0;
  margin: 1em 0;
  border-bottom: 1px #dddddd solid;
`;
const RatingTable = styled.div`
  display: grid;
  padding: 1em 0;
  margin: 1em 0;
  border-bottom: 1px #dddddd solid;

  font-weight: 100;
  color: #212121;
  font-size: 0.9em;

  width: fit-content;

  div:last-child {
    border-bottom: none;
  }
  #overAll {
    margin-bottom: 0.5em;
  }
  div {
    padding: 0.25em;
    display: flex;
    gap: 3em;
    justify-content: space-between;
    border-bottom: 1px #dddddd solid;
  }
`;

export default ListingPage;
