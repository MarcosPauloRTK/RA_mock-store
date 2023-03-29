import {
  Product,
  getProducts,
  getProductByID,
  getCategories,
  getProductsByCategory,
  getBestRatedProducts,
  getMostVotedProduct,
  getAveragePrice,
  getCheapestProduct,
  getMostExpansiveProduct
} from "../src/api_getters";

// getProducts()
describe("getProducts", () => {
  it("should return a 20-length array.", async () => {
    const data = await getProducts();
    expect(data).toHaveLength(20);
  });

  it("should contain all the results obtained by getProductsByID", async () => {
    let array = [];
    for (let i = 1; i < 21; i++) {
      array.push(getProductByID(i))
    }
    array = await Promise.all(array)

    const data = await getProducts();

    expect(data).toEqual(array);
  });
});

// getProductByID()
describe("getProductByID", () => {
  it("should raise error whenever the given ID it's not in the range 1-20", async () => {
    await expect(getProductByID(30)).rejects.toThrow();
  });

  it("should return a Product otherwise", async () => {
    const product = await getProductByID(1);
    expect(product).toMatchObject<Product>({ ...product });
  });
});

// getCategories()
describe("getCategories", () => {
  it("should return a string array.", async () => {
    const categories = await getCategories();

    expect(Array.isArray(categories)).toBe(true);
    expect(typeof categories[0]).toBe("string");
  });
});

// getProductByCategory()
describe("getProductsByCategory", () => {
  it("should return an array with all the products filtered by a specific category", async () => {
    const randomCategory = "electronics";
    const products = await getProducts();
    const productsByCategory = await getProductsByCategory(randomCategory);

    expect(productsByCategory).toEqual(
      products.filter(({ category }) => category === randomCategory)
    );
  });

  it("should return a empty array otherwise", async () => {
    const productsByCategory = await getProductsByCategory("nothing");

    expect(productsByCategory).toHaveLength(0);
  });
});

describe("getBestRatedProducts", () => {
  it("should return an array containing all the products rated greater than 4 points", async () => {
    const products = await getProducts();
    const result = await getBestRatedProducts();

    expect(result).toEqual(products.filter(({ rating: { rate } }) => rate > 4));
  });
});

describe("getMostVotedProducts", () => {
  it("should return single product which is the most voted", async () => {
    const result = await getMostVotedProduct();
    expect([result]).toHaveLength(1);
  });
});

describe("getAveragePrice", () => {
  it("should return a value between the most and the least valued products", async () => {
    const { price: priceCheapest } = await getCheapestProduct();
    const { price: priceMostExpansive } = await getMostExpansiveProduct();
    const average = await getAveragePrice();

    expect(average).toBeGreaterThanOrEqual(priceCheapest);
    expect(average).toBeLessThanOrEqual(priceMostExpansive);
  });
});

describe("getCheapestProduct", () => {
  it("should the only cheapest product", async () => {
    const cheapest = await getCheapestProduct();
    const products = await getProducts();

    expect(cheapest).toEqual(
      products.reduce(
        (acc, product) => (acc.price > product.price ? product : acc),
        products[0]
      )
    );
  });
});

describe("getMostExpansiveProduct", () => {
  it("should the only most expansive product", async () => {
    const mostexpensive = await getMostExpansiveProduct();
    const products = await getProducts();

    expect(mostexpensive).toEqual(
      products.reduce(
        (acc, product) => (acc.price < product.price ? product : acc),
        products[0]
      )
    );
  });
});
