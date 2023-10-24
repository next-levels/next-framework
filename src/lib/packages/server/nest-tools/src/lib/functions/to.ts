export function to(obj) {
  return obj
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}

export function handleError(error) {
  if (error) {
    throw error;
  }
}
