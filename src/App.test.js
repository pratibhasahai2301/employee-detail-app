import React from "react";
import { createMockStore } from "redux-test-utils";
import LogOutButtonContainer from "./App";
import shallow from 'enzyme/src/shallow';

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

describe("App", () => {
  const mockState = {
    session: {
      logoutText: "Log me out"
    }
  };

  it("renders", () => {
    const store = createMockStore(mockState);
    const container = shallowWithStore(<LogOutButtonContainer />, store);
    expect(container).toBeTruthy();
  });
});