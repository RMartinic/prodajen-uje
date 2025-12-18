const picsumValidIds = [10, 20, 30, 40, 50, 60, 70, 80];

export function getPicsumId(productId: number) {
  return picsumValidIds[(productId - 1) % picsumValidIds.length];
}
