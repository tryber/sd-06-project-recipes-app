export default function splitPathname(pathname) {
  const splittedUrl = pathname.split('/');
  splittedUrl.shift();
  return splittedUrl;
}
