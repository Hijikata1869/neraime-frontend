// google place api用の関数を書いていく
export const searchPlace = async (placeName: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=formatted_address,name&language=ja&key=AIzaSyDo6RYabD_apWF-78R5ovZGD3cyw2BhTaM`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};
