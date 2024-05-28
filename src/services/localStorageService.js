export const getDataKey = (key) => {
  let stringData = localStorage.getItem(key);
  return JSON.parse(stringData);
};
export const setData = (key, data) => {
  let stringData = JSON.stringify(data);
  localStorage.setItem(key, stringData);
};
