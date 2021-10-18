export const mutateOption = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0
}

export const fetcher = async (url: string) => await fetch(url).then(async (res) => await res.json());
