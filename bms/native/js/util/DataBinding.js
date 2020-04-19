let DataBinding = {
    getValueFromSessionStorageByKey: function (key) {
        return sessionStorage.getItem(key);
    },
    getValueFromLocalStorageByKey: function (key) {
        return localStorage.getItem(key);
    },
}