export default {
  setItem(key, array) {
    try {
      localStorage.setItem(key, JSON.stringify(array));
    } catch (err) {
      console.error('Set state error: ', err);
    }
  },

  getItem(key) {
    try {
      const localStorageData = localStorage.getItem(key);
      return localStorageData === null ? undefined : JSON.parse(localStorageData);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },
};
