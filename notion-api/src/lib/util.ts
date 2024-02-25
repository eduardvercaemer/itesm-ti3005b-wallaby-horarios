export async function mapAsync<A, B>(
  collection: A[],
  fn: (item: A) => Promise<B>,
): Promise<B[]> {
  const result: B[] = [];
  for (const item of collection) {
    result.push(await fn(item));
  }
  return result;
}
