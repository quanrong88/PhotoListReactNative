// tests/apiService.test.ts

import { getPhotos, searchPhotos, getPhotoItem, Photo } from '../api/apiService';

// Mock global fetch
global.fetch = jest.fn();

const mockPhoto: Photo = {
  albumId: 1,
  id: 1,
  title: 'test photo',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952',
};

describe('getPhotos', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches photos and updates URLs', async () => {
    // Arrange: mock successful API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockPhoto],
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
    (fetch as jest.Mock).mockResolvedValueOnce({
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
    (fetch as jest.Mock).mockClear();
  });

  it('fetches photos using query string', async () => {
    const mockData: Photo[] = [{ ...mockPhoto, id: 2, title: 'a sunset photo' }];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await searchPhotos('sunset');

    const expectedData = mockData.map(p => ({
        ...p,
        url: p.url.replace('https://via.placeholder.com', 'https://dummyimage.com'),
        thumbnailUrl: p.thumbnailUrl.replace('https://via.placeholder.com', 'https://dummyimage.com')
    }));

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?q=sunset'
    );
    expect(result).toEqual(expectedData);
  });

  it('throws error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
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
    (fetch as jest.Mock).mockClear();
  });

  it('fetches single photo by ID', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhoto,
    });

    const result = await getPhotoItem(1);

    const expectedPhoto = {
        ...mockPhoto,
        url: 'https://dummyimage.com/600/92c952',
        thumbnailUrl: 'https://dummyimage.com/150/92c952',
    }

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos/1');
    expect(result).toEqual(expectedPhoto);
  });

  it('throws error if photo not found (e.g. 404)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const originalConsoleError = console.error;
    console.error = jest.fn();

    await expect(getPhotoItem(999)).rejects.toThrow('HTTP error! status: 404');

    console.error = originalConsoleError;
  });
});