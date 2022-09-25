
function resetSetItem (key, newVal) {
  let newStorageEvent = document.createEvent('StorageEvent');
  if (key === 'customerGetTime') {
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
  if (key === 'customerToUpdate') {
      const storage = {
        setItem: function (k, val) {
          sessionStorage.setItem(k, val);
          newStorageEvent.initStorageEvent('toUpdate', false, false, k, null, val, null, null);
          window.dispatchEvent(newStorageEvent)
        }
      }
      return storage.setItem(key, newVal);
  }
  if (key === 'sideOpenKey') {
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        newStorageEvent.initStorageEvent('sideOpen', false, false, k, null, val, null, null);
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}
export default resetSetItem