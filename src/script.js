import { load } from "cheerio";
import { writeFile } from "./utils/writer.js";
import { getDataFromURL } from "./utils/request.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import filterByPrice from "./filter-by-price.js";
const argv = yargs(hideBin(process.argv)).argv;

const city = argv.location || "temuco-la-araucania";
const MAX_pages = argv.maxPages || 1;
let houses = [];
let page = 0;

const priceCLPFormatter = new Intl.NumberFormat("es-CL", {
  currency: "CLP",
  style: "currency",
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Asynchronous function to fetch house data from a web source.
 *
 * @returns {Promise<void>} A Promise that resolves when the data is fetched and processed.
 */
async function getHousesFromWeb() {
  console.log(`Page ${page + 1} of ${MAX_pages}`);

  const data = await getDataFromURL(
    `https://www.portalinmobiliario.com/venta/casa/propiedades-usadas/${city}/_Desde_${
      (argv.perPage || 50) * (page + 1)
    }_NoIndex_True`
  );

  const pageLoaded = load(data);

  // Find all elements with ui-search-result__wrapper class, in div element.
  pageLoaded("div.ui-search-result__wrapper").each((_index, el) => {
    const section = pageLoaded(el).find("div > div > a");
    const url = pageLoaded(section).attr("href");
    const originalPrice = Number(
      pageLoaded(section)
        .find(".andes-money-amount__fraction")
        .text()
        .toString()
        .replace(/\./g, "")
    );
    const inUF =
      pageLoaded(section)
        .find(".andes-money-amount__currency-symbol")
        .text() === "UF";
    const size = pageLoaded(section)
      .find(".ui-search-card-attributes__attribute")
      .first()
      .text();
    const dorms = pageLoaded(section)
      .find(".ui-search-card-attributes__attribute")
      .next()
      .text();
    const location = pageLoaded(section)
      .children()
      .next()
      .next()
      .next()
      .children()
      .first()
      .text();
    houses.push({ url, originalPrice, inUF, size, dorms, location });
  });

  page++;

  await sleep(1000);

  return page === MAX_pages ? page : getHousesFromWeb();
}

//Get houses with the method `getHousesFromWeb`, finally, get the price in CLP and generate the JSON file with the extracted data
getHousesFromWeb().then(async () => {
  const data = await getDataFromURL("https://mindicador.cl/api");
  const housesWithPriceInCLP = houses.map((house) => {
    return {
      ...house,
      priceInCLP: new Intl.NumberFormat("es-CL", {
        currency: "CLP",
        style: "currency",
      }).format(
        house.inUF ? house.originalPrice * data.uf.valor : house.originalPrice
      ),
    };
  });

  writeFile(city, housesWithPriceInCLP);
  if (argv.maximumPrice) {
    filterByPrice({
      houses: housesWithPriceInCLP,
      maximumPrice: argv.maximumPrice,
      city,
    });
  }
});
