const getListings = async () =>
  await fetch("https://fakestoreapi.com/carts?limit=5").then((res) =>
    res.json()
  );

const postListings = async (data) =>
  await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());

export default {
  getListings,
  postListings,
};
