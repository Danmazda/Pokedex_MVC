export function validateAttr(obj) {
  let {
    number,
    name,
    type,
    secondType,
    image,
    description,
    height,
    weight,
    category,
    ability
  } = obj;
  secondType = secondType.toLowerCase();
  if (height === "") {
    height = null;
  }
  if (weight === "") {
    weight = null;
  }
  if (secondType === "none") {
    secondType = null;
  }
  return {
    number: Number(number),
    name: name.toLowerCase(),
    type: type.toLowerCase(),
    secondType,
    image,
    description,
    height,
    weight,
    category,
    ability
  };
}