export const navigateBetweenApps = (
  url: string,
  target: '_self' | '_blank' = '_self',
) => {
  window.open(url, target);
};
