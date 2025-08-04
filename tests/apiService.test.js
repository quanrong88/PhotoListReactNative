// tests/apiService.test.js

import { getPhotos, searchPhotos, getPhotoItem } from '../api/apiService';

// Mock global fetch
global.fetch = jest.fn();

describe('getPhotos', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches photos and updates URLs', async () => {
    // Arrange: mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: 'test photo',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
      ],
    });

    // Act
    const photos = await getPhotos(0, 1);

    // Assert
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1');
    expect(photos).toHaveLength(1);
    expect(photos[0].url).toBe('https://dummyimage.com/600/92c952');
    expect(photos[0].thumbnailUrl).toBe('https://dummyimage.com/150/92c952');
  });

  it('throws error on failed response (status not ok)', async () => {
    // Arrange: mock failed API response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    // Silence console.error just for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Act + Assert
    await expect(getPhotos()).rejects.toThrow('HTTP error! status: 500');

    // Restore console.error
    console.error = originalConsoleError;
  });

  
});

describe('searchPhotos', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches photos using query string', async () => {
    const mockData = [{ id: 1, title: 'sunset' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await searchPhotos('sunset');

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?q=sunset'
    );
    expect(result).toEqual(mockData);
  });

  it('throws error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const originalConsoleError = console.error;
    console.error = jest.fn();

    await expect(searchPhotos('sunset')).rejects.toThrow('HTTP error! status: 404');

    console.error = originalConsoleError;
  });
});

describe('getPhotoItem', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches single photo by ID', async () => {
    const mockPhoto = {
      id: 1,
      title: 'single photo',
      url: 'https://dummyimage.com/600/92c952',
      thumbnailUrl: 'https://dummyimage.com/150/92c952',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhoto,
    });

    const result = await getPhotoItem(1);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos/1');
    expect(result).toEqual(mockPhoto);
  });

  it('throws error if photo not found (e.g. 404)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const originalConsoleError = console.error;
    console.error = jest.fn();

    await expect(getPhotoItem(999)).rejects.toThrow('HTTP error! status: 404');

    console.error = originalConsoleError;
  });
});