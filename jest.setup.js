import "@testing-library/jest-native/extend-expect";
import { cleanup } from "@testing-library/react-native";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("react-native-reanimated/lib/reanimated2/jestUtils").setUpTests();

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// global setup for each test
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  cleanup();
});
