export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function toKebabCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
