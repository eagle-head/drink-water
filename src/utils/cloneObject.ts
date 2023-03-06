export function cloneObject<T extends object>(obj: T): T {
  return Object.assign({}, obj);
}
