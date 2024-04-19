export const fetcher = async (url: string) => {
  // console.log("fetching", url);
  if (url.includes("undefined")) {
    return null;
  }

  const response: any = await fetch(url);
  // console.log("response", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
