const millisecondsToObject = milliseconds => {
  // this will collate milliseconds into an easy to use object of hours, minutes, seconds
  const pyramid = {
    hour: 3.6e6,
    minute: 6e4,
    second: 1000
  };

  const millisecondsObject = {};
  Object.keys(pyramid).forEach(key => {
    millisecondsObject[key] = Math.floor(milliseconds / pyramid[key]);
    milliseconds -= millisecondsObject[key] * pyramid[key];
  });

  return millisecondsObject;
};

const millisecondsObjectToString = msObject => {
  if (msObject.hour > 0) {
    return `${msObject.hour > 9 ? msObject.hour : "0" + msObject.hour}:${
      msObject.minute > 9 ? msObject.minute : "0" + msObject.minute
    }:${msObject.second > 9 ? msObject.second : "0" + msObject.second}`;
  }

  return `${msObject.minute > 9 ? msObject.minute : "0" + msObject.minute}:${
    msObject.second > 9 ? msObject.second : "0" + msObject.second
  }`;
};

module.exports = {
  millisecondsToObject: millisecondsToObject,

  millisecondsToString: milliseconds => {
    const msObject = millisecondsToObject(milliseconds);
    return millisecondsObjectToString(msObject);
  },

  millisecondsObjectToString: millisecondsObjectToString
};
