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
  const [amenitiesShown, setAmenitiesShown] = useState(false);
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
    window.scrollTo(0, 0);
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
                  setAmenitiesShown(!amenitiesShown);
                  setAmenitiesSlice(amenitiesShown ? 6 : 1000);
                }}
              >
                {amenitiesShown ? 'Show Less' : `Show all ${amenities.length} amenities`}
              </ShowAmenities>
            </Section>
            {data.number_of_reviews != '0' && (
              <Section>
                <h2>How others rated this location</h2>
                <RatingSection>
                  <RatingOverview>
                    <div id="overAll">
                      <h2>{data.review_scores_rating} </h2>
                      <h3>Overall Rating</h3>
                    </div>
                    <p>Latest review : {data.last_review}</p>
                    <p> {data.number_of_reviews} total reviews</p>
                  </RatingOverview>
                  <RatingTable>
                    <h3>Break Down</h3>
                    <div>
                      <p>value score:</p> <p> {data.review_scores_value}</p>
                    </div>
                    <div>
                      <p>location score:</p> <p> {data.review_scores_location}</p>
                    </div>
                    <div>
                      <p>cleanliness score:</p> <p> {data.review_scores_cleanliness} </p>
                    </div>
                    <div>
                      <p>listing accuracy score: </p> <p>{data.review_scores_accuracy}</p>
                    </div>
                    <div>
                      <p>check-in score:</p> <p> {data.review_scores_checkin}</p>
                    </div>
                    <div>
                      <p>communication score: </p> <p>{data.review_scores_communication}</p>
                    </div>
                  </RatingTable>
                </RatingSection>
              </Section>
            )}
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
              <ReserveButton
                onClick={() => {
                  alert(
                    "Wow!\n\n\nYou found a feature that isn't complete yet!\nTo Claim your prize, go tell Biff that he should be better.\n\nCongratulations!"
                  );
                }}
              >
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
            <p>{stripHtml(data.neighborhood_overview)}</p>
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
    padding: 0.5em;

    @media (min-width: 400px) {
      padding: 2em;
    }
  }
`;

const Footer = styled.div`
  background-color: #f7f7f7;
  height: 500px;
  padding: 4em;
  margin: 5em auto 0;
  border-top: 1px #dddddd solid;
`;

const Split = styled.div`
  display: flex;
  flex-direction: column-reverse;

  gap: 4em;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
const Left = styled.div`
  width: 100%;
  @media (min-width: 800px) {
    width: 70%;
  }
`;
const Right = styled.div`
  width: 100%;
  position: fixed;
  background-color: white;
  bottom: 0;
  left: 0;

  @media (min-width: 800px) {
    width: 30%;
    position: relative;
  }
  padding: 2em 0;
  padding-bottom: 0;
  padding-right: 0;
`;
const PriceBox = styled.div`
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
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 400px) {
    grid-template-columns: repeat(auto-fill, 50%);
  }
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
  border-radius: 1em;
  border: none;
  margin: 1em 0;
  width: 100%;
  aspect-ratio: 1/1;

  @media (min-width: 800px) {
    aspect-ratio: 2/1;
  }
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

  div {
    max-width: 60ch;
  }
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
  gap: 0.5em;
  overflow: hidden;
  border-radius: 1em;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  img:hover {
    filter: brightness(0.8);
  }

  img {
    transition: filter 0.2s ease;
    width: 100%;
    height: fit-content;
    aspect-ratio: 1;
  }
  div {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(4, 1fr);
    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
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
const RatingSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2em;
  gap: 2em;
  justify-content: space-between;
`;
const RatingOverview = styled.div`
  #overAll {
    min-width: 20ch;
    margin-top: 2em;
    border-bottom: solid 1px #dddddd;
    padding-bottom: 1em;
    margin-bottom: 1em;
    align-items: baseline;
    h2 {
      font-size: 4em;
      display: flex;
      margin: 0;
      padding: 0;
      line-height: 1em;
    }
  }
  p {
    margin-top: 0.5em;
  }
`;
const RatingTable = styled.div`
  display: grid;
  color: #222222;
  width: fit-content;

  /* border: #8b8b8b solid 1px;
  border-radius: 1em;
  padding: 1em; */

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
