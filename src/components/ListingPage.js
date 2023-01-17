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
  const url = imgIXDomain + data.picture_url.replace('https://a0.muscache.com/', '');
  const hostImageUrl =
    imgIXDomain + data.host_thumbnail_url.replace('https://a0.muscache.com/', '');
  const [amenitiesSlice, setAmenitiesSlice] = useState(6);
  const amenities = JSON.parse(data.amenities);

  const hostJoinDateText = new Date(data.host_since);
  const hostJoinYear = hostJoinDateText.getFullYear();
  const hostJoinMonth = Intl.DateTimeFormat('en-US', { month: 'long' }).format(hostJoinDateText);

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [location]);

  return (
    <StyleWrapped id="ListingPage">
      <main>
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
        <Split>
          <Left>
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
              <Imgix
                imgixParams={imgixParams}
                className="hostImg"
                src={hostImageUrl}
                sizes="250px"
              />
            </BriefDetails>
            <Description>{stripHtml(data.description)}</Description>
            <Section>
              <h2>What this place offers</h2>
              <AmenitiesList>
                {amenities.slice(0, amenitiesSlice).map((item) => (
                  <Amenity> · {item}</Amenity>
                ))}
              </AmenitiesList>
              <ShowAmenities
                onClick={() => {
                  setAmenitiesSlice(100);
                }}
              >
                Show all {amenities.length} amenities
              </ShowAmenities>
            </Section>
            <Section>
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
            </Section>
          </Left>
          <Right>
            <PriceBox>
              <h3>
                {data.price.replace('.00', '')} <span>night</span>
              </h3>
              <p>
                Stay length : {data.minimum_nights}-{data.maximum_nights} nights
              </p>
              <p>Availability : {data.has_availability === 't' ? 'Available' : 'None'}</p>
              <ReserveButton>
                <h4>Reserve</h4>
              </ReserveButton>
            </PriceBox>
          </Right>
        </Split>
        <Section id="Map">
          <h2>Where you'll be</h2>
          <Map
            src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
          />
          <MapDetails>
            <h3>{data.neighbourhood}</h3>
            <p>{data.neighborhood_overview}</p>
          </MapDetails>
        </Section>
        <Section>
          <HostSection>
            <div>
              <HostProfile>
                <Imgix
                  imgixParams={imgixParams}
                  className="hostImg"
                  src={hostImageUrl}
                  sizes="250px"
                />
                <div>
                  <h3>Hosted by {data.host_name}</h3>
                  <p>
                    Joined in {hostJoinMonth} {hostJoinYear}
                  </p>
                </div>
              </HostProfile>
              <HostBadges>
                {data.host_identity_verified === 't' && <p>Identity verified</p>}
                {data.host_is_superhost === 't' && <p>Superhost</p>}
                <p>{data.host_listings_count} Host listings</p>
              </HostBadges>
              <p>{data.host_about}</p>
            </div>
            {data.host_is_superhost === 't' && (
              <SuperHost>
                <h3>{data.host_name} is a Superhost</h3>
                <p>
                  Superhosts are experienced, highly rated hosts who are committed to providing
                  great stays for guests.
                </p>
              </SuperHost>
            )}
          </HostSection>
        </Section>
      </main>
      <Footer>
        <h3>Footer Goes Here</h3>
      </Footer>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  color: #222222;
  main {
    margin: auto;
    max-width: 120ch;
    padding: 2em;
  }
`;

const Footer = styled.div`
  background-color: #f7f7f7;
  height: 500px;
  width: 100%;
  padding: 4em;
  max-width: 120ch;
  margin: 5em auto 0;
  border-top: 1px #dddddd solid;
`;

const Split = styled.div`
  display: flex;
  gap: 2em;
`;
const Left = styled.div`
  width: 70%;
`;
const Right = styled.div`
  width: 30%;
`;
const PriceBox = styled.div`
  margin: 2em;
  box-shadow: 0 0 10px 1px #0000006a;
  border-radius: 1em;
  border: solid 1px #dddddd;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 5em;
  padding: 1em;
  h3 {
    margin-bottom: 1em;
  }
  p {
    margin-bottom: 0.5em;
  }
  h3 span {
    font-weight: 400;
  }
`;

const ReserveButton = styled.button`
  margin-top: 3em;
  text-align: center;
  border-radius: 1em;
  background-color: #eb2452;
  padding: 1em;
  border: none;
  color: white;
  width: 100%;
`;
const AmenitiesList = styled.div`
  margin: 1em 0 3em;
`;
const ShowAmenities = styled.button`
  padding: 1em;
  font-size: 1em;
  font-weight: 600;
  border: 1px solid black;
  border-radius: 0.5em;
`;

const Amenity = styled.p`
  margin: 0.5em 0;
`;

const Section = styled.div`
  padding-top: 3em;
  border-top: 1px #dddddd solid;
  margin-top: 2em;
`;

const Map = styled.iframe`
  width: 100%;
  aspect-ratio: 2/1;
  border: none;
  padding: 1em 0;
`;

const MapDetails = styled.div`
  h3 {
    padding: 1em 0;
  }
  p {
    line-height: 2em;
  }
`;

const HostSection = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-between;
`;

const HostProfile = styled.div`
  display: flex;
  gap: 1.5em;
  .hostImg {
    flex: 0;
    border-radius: 1000px;
    height: 4em;
  }
`;

const HostBadges = styled.div`
  display: flex;
  margin: 1.2em 0.2em 2em;
  gap: 1em;
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

const SuperHost = styled.div`
  max-width: 40ch;
  border: 1px solid #8b8b8b;
  border-radius: 1em;
  padding: 2em;
  h3 {
    margin-bottom: 1em;
  }
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
`;
const RatingTable = styled.div`
  display: grid;
  padding: 1em 0;
  margin: 1em 0;

  font-weight: 100;
  color: #222222;
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
  }
`;

export default ListingPage;
