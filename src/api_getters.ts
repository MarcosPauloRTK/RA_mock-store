enum FakeStoreRoutes {
  Products = "https://fakestoreapi.com/products/",
  Categories = "https://fakestoreapi.com/products/categories/",
}

const fetchAPI = async (url: FakeStoreRoutes, endpoint?: number) => {
  return await fetch(endpoint ? url + `${endpoint}` : url).then((response) =>
    response.json()
  );
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "electronics" | "jewelery" | "men's clothing" | "women's clothing";
  image: string;
  rating: { rate: number; count: number };
};

export const getProducts: () => Promise<Product[]> = async () => {
  return await fetchAPI(FakeStoreRoutes.Products);
};

export const getProductByID: (id: number) => Promise<Product> = async (id) => {
  return await fetchAPI(FakeStoreRoutes.Products, id);
};

export const getCategories: () => Promise<string[]> = async () => {
  return await fetchAPI(FakeStoreRoutes.Categories);
};

export const getProductsByCategory: (
  category: string
) => Promise<Product[]> = async (category) => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);
  return products.filter((product) => product.category == category);
};

export const getBestRatedProducts: () => Promise<Product[]> = async () => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);

  return products.filter((product) => product.rating.rate > 4);
};

export const getMostVotedProduct = async () => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);

  return products.reduce(
    (acc, product) => (product.rating.count > acc.rating.count ? product : acc),
    { rating: { count: -1 } }
  );
};

export const getAveragePrice: () => Promise<number> = async () => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);

  return products.reduce(
    ({ count, average, sum }, { price }) => {
      return {
        count: ++count,
        average: (price + count * average) / count,
        sum: sum + price,
      };
    },
    { count: 0, average: 0, sum: 0 }
  ).average;
};

export const getCheapestProduct = async () => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);

  return products.reduce(
    (acc, product) => (acc.price > product.price ? product : acc),
    { price: Infinity }
  );
};

export const getMostExpansiveProduct = async () => {
  const products: Product[] = await fetchAPI(FakeStoreRoutes.Products);

  return products.reduce(
    (acc, product) => (acc.price < product.price ? product : acc),
    { price: -1 }
  );
};

// export { FakeStore_Routes, getProducts };
