export const setItem = (item, value) => {
  localStorage.setItem(item, value);
};

export const getItem = (item) => {
  return localStorage.getItem(item);
};

export const setObj = (item, obj) => {
  localStorage.setItem(item, JSON.stringify(obj));
};

export const getObj = (obj) => {
  return JSON.parse(localStorage.getItem(obj));
};

export const removeAny = (item) => {
  localStorage.removeItem(item);
};

export const clear = () => {
  console.log("Are you crazy?");
  // localStorage.clear();
};

// export { setObj, getObj };
