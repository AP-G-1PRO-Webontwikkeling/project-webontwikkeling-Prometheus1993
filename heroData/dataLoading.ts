/**
 * Loads data from the specified URL.
 * 
 * @param url - The URL to fetch the data from.
 * @returns A promise that resolves to an array of type T.
 * @throws An error if the HTTP response is not successful.
 */
const loadData = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Fout bij het laden van data van ${url}:`, error);
    return [];
  }
};

export {loadData};
