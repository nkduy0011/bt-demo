export const generateId = (data) => {
  if (data.length > 0) {
    var idMax = Math.max.apply(
      Math,
      data.map(function (o) {
        return o.id;
      })
    );
    return idMax + 1;
  } else return 1;
};
