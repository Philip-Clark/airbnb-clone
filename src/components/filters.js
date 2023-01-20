import SuperHost from '@mui/icons-material/MilitaryTech';
import VerifiedHost from '@mui/icons-material/VerifiedUser';
import FiveStar from '@mui/icons-material/Star';
import SavingsIcon from '@mui/icons-material/Savings';
import GroupsIcon from '@mui/icons-material/Groups';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; //beach side
import CottageIcon from '@mui/icons-material/Cottage'; //full house
import PoolIcon from '@mui/icons-material/Pool'; //Has pool
import CountertopsIcon from '@mui/icons-material/Countertops'; //has kitchen
import FavoriteIcon from '@mui/icons-material/Favorite'; //popular
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled'; //secluded location
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import TodayIcon from '@mui/icons-material/Today'; //short stays
import DinnerDiningIcon from '@mui/icons-material/DinnerDining'; //dinning nearby
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'; //Internet connectivity
import GolfCourseIcon from '@mui/icons-material/GolfCourse'; //Golfing nearby
import SolarPowerIcon from '@mui/icons-material/SolarPower'; //Solar power
const filters = [
  {
    icon: <SuperHost />,
    label: 'Super Host',
    filterMethod: (e) => e.host_is_superhost === 't',
  },
  {
    icon: <VerifiedHost />,
    label: 'Verified Host',
    filterMethod: (e) => e.host_identity_verified === 't',
  },
  {
    icon: <FiveStar />,
    label: 'Highly Rated',
    filterMethod: (e) => parseFloat(e.review_scores_rating) >= 4.5,
  },
  {
    icon: <SavingsIcon />,
    label: 'Great Value',
    filterMethod: (e) =>
      parseFloat(e.review_scores_value) >= 4.0 && parseFloat(e.price.replace(/[$,]/g, '')) <= 200,
  },
  {
    icon: <DateRangeIcon />,
    label: 'Long Stays',
    filterMethod: (e) => parseFloat(e.maximum_nights) >= 14,
  },
  {
    icon: <TodayIcon />,
    label: 'Short Stays',
    filterMethod: (e) => parseInt(e.minimum_nights) <= 3,
  },
  {
    icon: <BeachAccessIcon />,
    label: 'Near Beach',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('beach') ||
      e.description.toLowerCase().includes('beach') ||
      e.amenities.toLowerCase().includes('beach') ||
      e.neighborhood_overview.toLowerCase().includes('beach'),
  },
  {
    icon: <CottageIcon />,
    label: 'Entire House',
    filterMethod: (e) => e.property_type.toLowerCase().includes('entire'),
  },
  {
    icon: <PoolIcon />,
    label: 'Near Pool',
    filterMethod: (e) =>
      e.description.toLowerCase().includes('pool') ||
      e.amenities.toLowerCase().includes('pool') ||
      e.neighborhood_overview.toLowerCase().includes('pool'),
  },
  {
    icon: <CountertopsIcon />,
    label: 'Has Kitchen',
    filterMethod: (e) =>
      e.description.toLowerCase().includes('kitchen') ||
      e.amenities.toLowerCase().includes('kitchen'),
  },
  {
    icon: <FavoriteIcon />,
    label: 'Most Popular',
    filterMethod: (e) => parseFloat(e.number_of_reviews) > 20,
  },
  {
    icon: <GroupsIcon />,
    label: 'Big Groups',
    filterMethod: (e) => parseFloat(e.accommodates) > 6,
  },
  {
    icon: <DomainDisabledIcon />,
    label: 'Secluded Location',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('secluded') ||
      e.description.toLowerCase().includes('secluded') ||
      e.amenities.toLowerCase().includes('secluded') ||
      e.neighborhood_overview.toLowerCase().includes('secluded'),
  },

  {
    icon: <DinnerDiningIcon />,
    label: 'Near Restaurants',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('restaurants') ||
      e.description.toLowerCase().includes('restaurants') ||
      e.amenities.toLowerCase().includes('restaurants') ||
      e.neighborhood_overview.toLowerCase().includes('restaurants'),
  },

  {
    icon: <NetworkCheckIcon />,
    label: 'Internet Services',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('internet') ||
      e.description.toLowerCase().includes('internet') ||
      e.amenities.toLowerCase().includes('internet') ||
      e.neighborhood_overview.toLowerCase().includes('internet') ||
      e.name.toLowerCase().includes('wifi') ||
      e.description.toLowerCase().includes('wifi') ||
      e.amenities.toLowerCase().includes('wifi') ||
      e.neighborhood_overview.toLowerCase().includes('wifi'),
  },
  {
    icon: <GolfCourseIcon />,
    label: 'Near Golfing',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('golf') ||
      e.description.toLowerCase().includes('golf') ||
      e.amenities.toLowerCase().includes('golf') ||
      e.neighborhood_overview.toLowerCase().includes('golf'),
  },
  {
    icon: <SolarPowerIcon />,
    label: 'Solar Power',
    filterMethod: (e) =>
      e.name.toLowerCase().includes('solar') ||
      e.description.toLowerCase().includes('solar') ||
      e.amenities.toLowerCase().includes('solar') ||
      e.neighborhood_overview.toLowerCase().includes('solar'),
  },

  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
  { icon: <FilterAltRoundedIcon />, label: 'Place Holder', filterMethod: (e) => 1 === 1 },
];

export default filters;
