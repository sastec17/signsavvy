import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
// Wrap your App component with gestureHandlerRootHOC
const AppWithGestureHandler = gestureHandlerRootHOC(App);

// Register your app
AppRegistry.registerComponent('MyApp', () => AppWithGestureHandler);






// Screens 
import LoginPage from './navigation/screens/Login';
import CreateAccount from './navigation/screens/CreateAccount';
import MainContainer from './navigation/MainContainer';

// App enters and runs from here
function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage} 
          options= {{
            headerStyle: {
              backgroundColor: '#fb5b5a',
            }
          }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount}
            options= {{
              headerStyle: {
              backgroundColor: '#fb5b5a',
            }
          }}
        />
        <Stack.Screen name="SignSavvy" component={MainContainer}
            options= {{
              headerStyle: {
              backgroundColor: '#fb5b5a',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
export default App;