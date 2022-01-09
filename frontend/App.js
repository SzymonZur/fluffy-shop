import React from "react";
import ShopNavigator from "./navigation/ShopNavigator";
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Context API
import Auth from "./context/store/Auth";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <ShopNavigator />
        <Toast />
      </Provider>
    </Auth>
  );
}
