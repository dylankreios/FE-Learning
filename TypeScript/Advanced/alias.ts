/**
 * 使用 type 关键字起别名
 */

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  return typeof n === "string" ? n : n();
}
