module.exports = {
  format_date: (date) => {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.toLocaleTimeString()}`;
  },

  equal: function (a, b) {
    if (a === b) {
      return true;
    }
    return false;
  },
  //   subString: (content) => {
  //     if (content.length < 255) {
  //       return content;
  //     } else {
  //       return content.substring(0, 254) + "......";
  //     }
  //   },
};
