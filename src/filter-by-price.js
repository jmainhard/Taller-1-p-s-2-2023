import XLSX from "xlsx";
import { writeFile } from "./utils/writer.js";

/**
 * Filter houses based on a maximum price and create an XLSX file containing the filtered data.
 *
 * @param {object} options - An object containing the following parameters:
 * @param {Array} options.houses - An array of house objects to be filtered.
 * @param {number} options.maximumPrice - The maximum price for filtering houses.
 * @param {string} options.city - The name of the city associated with the data.
 */
function filterByPrice({ houses, maximumPrice, city }) {
	const filteredHouses = houses
		.filter(
			(house) =>
				Number(house.priceInCLP.replace("$", "").replace(/\./g, "")) <
				maximumPrice
		)
		.map((filterHouse) => {
			return {
				Location: filterHouse.location,
				URL: filterHouse.url,
			};
		});

	const workSheet = XLSX.utils.json_to_sheet(filteredHouses);
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet, "Houses");
	XLSX.writeFile(workBook, `./xlsx/${city}.xlsx`);
	console.log(`${city} XLSX File generated successfully`);

	writeFile(city, filteredHouses);
}

export default filterByPrice;
