function getDomainfromUrl(url: string): string {
  return url.replace(/.+\/\/|www.|\..+/g, '');
}

export default getDomainfromUrl;
