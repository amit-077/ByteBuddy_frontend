import {createNativeStackNavigator} from '@react-navigation/native-stack';
import News from '../News';
import Preference from '../Preference';
import SignUp from '../SignUp';
import Login from '../Login';
import Settings from '../Settings';
import Contribute from '../Contribute';
import Sample from '../Sample';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 2000,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 1000,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 2000,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 2000,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 1000,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contribute"
        component={Contribute}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 1000,
          headerShown: false,
        }}
      />

<Stack.Screen
        name="Sample"
        component={Sample}
        options={{
          animationTypeForReplace: 'pop',
          animation: 'fade',
          animationDuration: 1000,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
