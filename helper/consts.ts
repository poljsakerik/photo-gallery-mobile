import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://127.0.0.1:8000/",
    amplitudeApiKey: null,
  },
  prod: {
    apiUrl: "http://vm-19.lrk.si:8000/",
    amplitudeApiKey: null,
  },
};

const getEnvVars = (env = Constants?.manifest?.releaseChannel) => {
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
