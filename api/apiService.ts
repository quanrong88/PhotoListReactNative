// apiService.ts
// This service provides methods for interacting with the JSONPlaceholder photo API.
// It uses the native `fetch` API for making network requests.

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * Replaces the placeholder image URL in a photo object.
 */
const updatePhotoUrl = (photo: Photo): Photo => {
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
 */
export const getPhotos = async (start: number = 0, limit: number = 10): Promise<Photo[]> => {
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
 */
export const searchPhotos = async (query: string): Promise<Photo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/photos?q=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(updatePhotoUrl);
  } catch (error) {
    console.error("Failed to search photos:", error);
    throw error;
  }
};

/**
 * Fetches a single photo item by its ID.
 */
export const getPhotoItem = async (id: number): Promise<Photo> => {
  try {
    const response = await fetch(`${BASE_URL}/photos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return updatePhotoUrl(data);
  } catch (error) {
    console.error(`Failed to fetch photo with ID ${id}:`, error);
    throw error;
  }
};