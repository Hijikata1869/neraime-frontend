// google place api用の関数を書いていく
export const searchPlace = async (placeName: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=formatted_address,name&language=ja&key=${process.env.GOOGLE_PLACES_API_KEY}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};
