// apiService.js
// This service provides methods for interacting with the JSONPlaceholder photo API.
// It uses the native `fetch` API for making network requests.

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Replaces the placeholder image URL in a photo object.
 * @param {Object} photo The photo object from the API.
 * @returns {Object} The photo object with the updated URL.
 */
const updatePhotoUrl = (photo) => {
  // Check if the URL needs to be updated.
  if (photo.url && photo.url.startsWith('https://via.placeholder.com')) {
    return {
      ...photo,
      // Replace the base URL with the new one.
      url: photo.url.replace('https://via.placeholder.com', 'https://dummyimage.com'),
      // Also update the thumbnail for consistency, as per the original requirement's pattern.
      thumbnailUrl: photo.thumbnailUrl.replace('https://via.placeholder.com', 'https://dummyimage.com')
    };
  }
  return photo;
};

/**
 * Fetches a list of photos with pagination.
 * @param {number} start The starting index for the photos.
 * @param {number} limit The number of photos to fetch.
 * @returns {Promise<Array>} A promise that resolves with an array of photo objects.
 */
export const getPhotos = async (start = 0, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/photos?_start=${start}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Update the URL for each photo in the response.
    return data.map(updatePhotoUrl);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    throw error;
  }
};

/**
 * Searches for photos based on a query string.
 * @param {string} query The search query string.
 * @returns {Promise<Array>} A promise that resolves with an array of matching photo objects.
 */
export const searchPhotos = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/photos?q=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to search photos:", error);
    throw error;
  }
};

/**
 * Fetches a single photo item by its ID.
 * @param {number} id The ID of the photo to fetch.
 * @returns {Promise<Object>} A promise that resolves with a single photo object.
 */
export const getPhotoItem = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/photos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch photo with ID ${id}:`, error);
    throw error;
  }
};