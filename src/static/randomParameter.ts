const randomParameter = (
  users: User[],
  pallet: { [key: string]: `#${string}`[] },
  limit: "small" | "medium" | "large"
): Parameter => {
  let possibleKeys: (keyof User)[] = [];
  switch (limit) {
    case "small":
      possibleKeys = ["chirality", "subscriptionTier"];
      break;
    case "medium":
      possibleKeys = ["subscriptionTier", "buildingNumber", "birthDay", "chirality"];
      break;
    case "large":
      possibleKeys = ["chirality", "subscriptionTier", "buildingNumber", "birthDay", "birthMonth"];
      break;
    default:
      break;
  }
  const key = possibleKeys[~~(Math.random() * possibleKeys.length)];
  const set = [...new Set(users.map((d) => d[key]))];
  const counts = Object.fromEntries(
    set.map((elem) => [
      elem,
      users.filter((d) => d[key] === elem).length,
    ])
  );
  const values = Object.values(pallet).flat();
  const scale: { [key: string]: string } = Object.fromEntries(
    set.map((value, i) => [value, values[i % values.length]])
  );
  return ({key,scale,set,counts,pallet})
};

export default randomParameter
