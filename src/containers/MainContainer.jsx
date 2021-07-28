import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import * as firebase from "firebase";
import apiKeys from "../../config/key";
import { getOnboardFlag } from "../services";
import {
  Home,
  Cart,
  ItemDetail,
  OnBoarding,
  SignUp,
  SignIn,
  Loading,
  Profile,
  EditList,
  EditDetail,
} from "../views";
import { setOnBoarded } from "../store/actions/flags";

const Stack = createSharedElementStackNavigator();

export default function MainContainer() {
  const dispatch = useDispatch();

  // const { onBoarded } = useSelector((state) => state.flagsState);
  const [isLogin, setIsLogin] = React.useState(false);
  // useEffect(() => {
  //   (async () => {
  //     const flag = await getOnboardFlag();
  //     dispatch(setOnBoarded(flag === "DONE"));
  //   })();
  // }, []);

  const loginCheck = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLogin(true);
      }
    });
  };

  const stackOptions = () => ({
    gestureEnabled: false,
    transitionSpec: {
      open: { animation: "timing", config: { duration: 400 } },
      close: {
        animation: "timing",
        config: {
          duration: 400,
        },
      },
    },
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress,
      },
    }),
  });

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
    loginCheck();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={isLogin ? "Home" : "OnBoarding"}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Detail"
          component={ItemDetail}
          options={stackOptions}
        />
        <Stack.Screen name="Cart" component={Cart} options={stackOptions} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditList" component={EditList} />
        <Stack.Screen
          name="EditDetail"
          component={EditDetail}
          //options={stackOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
