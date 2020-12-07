export default function formatInProgressLink(page, link) {
  const initialindex = 0;
  const stringToReplace = new RegExp(page);
  const replacedlink = link.replace(stringToReplace, '');
  const newLink = replacedlink.substring(initialindex, replacedlink.length - 1);
  return newLink;
}
