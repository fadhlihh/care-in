const fromApiToGmaps = (location) => {
  return {
    latitude: location.lat,
    longitude: location.lng
  };
};

const fromMapsToApi = (location) => {
  return {
    lat: location.latitude,
    lng: location.longitude
  };
};

const LocationFormatter = {
  fromApiToGmaps,
  fromMapsToApi
};

export default LocationFormatter;
