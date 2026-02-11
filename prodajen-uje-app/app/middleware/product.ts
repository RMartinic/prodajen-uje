export interface Product {
  id: number;
  title: string;
  body: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=8",
  );
  return res.json();
};
