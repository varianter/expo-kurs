import axios from "axios";

const BASE_URL = "";

export const fetchDeparturesFromName = async (text) => {
  try {
    //https://astro-entur-api-example.vercel.app/api/search-departures?query=samfundet

    const response = await axios.get(
      `https://astro-entur-api-example.vercel.app/api/search-departures?query=${text}`,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    if (error.response && error.response.status === 404) {
      console.error("The requested resource was not found.");
    } else {
      console.log("Request failed");
    }

    throw error;
  }
};

export const fetchServiceJourney = async (id) => {
  try {
    //https://astro-entur-api-example.vercel.app/api/service-journey?id=NSR:ServiceJourney:10942

    const response = await axios.get(
      `https://astro-entur-api-example.vercel.app/api/service-journey?id=${id}`,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    if (error.response && error.response.status === 404) {
      console.error("The requested resource was not found.");
    } else {
      console.log("Request failed");
    }

    throw error;
  }
};

export const fetchStopPlaces = async (text) => {
  try {
    //https://astro-entur-api-example.vercel.app/api/search-quays?query=samfundet

    const response = await axios.get(
      `https://astro-entur-api-example.vercel.app/api/search-quays?query=samfundet${text}`,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    if (error.response && error.response.status === 404) {
      console.error("The requested resource was not found.");
    } else {
      console.log("Request failed");
    }

    throw error;
  }
};

export const fetchDeparturesFromID = async (id) => {
  try {
    //https://astro-entur-api-example.vercel.app/api/departures?id=NSR:StopPlace:42660

    const response = await axios.get(
      `https://astro-entur-api-example.vercel.app/api/departures?id=NSR:StopPlace:${id}`,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    if (error.response && error.response.status === 404) {
      console.error("The requested resource was not found.");
    } else {
      console.log("Request failed");
    }

    throw error;
  }
};
