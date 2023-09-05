import fs from "fs";

/**
 * Writes a JSON object to a JSON-format file in the "./json" folder.
 *
 * @param {string} city - The name of the city to be used as the JSON file's name.
 * @param {object} filter - The JSON object to be written to the file.
 */
export const writeFile = (city, filter) => {
    fs.writeFile(
        `./json/${city}.json`,
        JSON.stringify(filter),
        function (err) {
            if (err) {
                console.log(err);
            }
            console.log(`${city} JSON generated successfully`);
        }
    );
}