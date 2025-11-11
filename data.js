export const products = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: Math.round((10 + Math.random() * 140) * 100) / 100,
  category: ["Clothing", "Electronics", "Home", "Sports"][i % 4],
  image: `https://picsum.photos/seed/prod${i}/400/300`,
}));
