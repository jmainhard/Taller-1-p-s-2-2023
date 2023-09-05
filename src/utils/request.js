import axios from 'axios'

/**
 * Makes a GET request to the given URL and returns the data.
 *
 * @param {string} url - The URL to which the GET request should be made.
 * @returns {Object} - The data returned from the GET request.
 * @throws {Error} - Throws an error if the GET request fails.
 */
export const getDataFromURL = async (url) => {
    const { data } = await axios.get(url);
    return data;
}
