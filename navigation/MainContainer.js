import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/WelcomeScreen';
import TranslateScreen from './screens/RealTimeTranslateScreen.js'
import GalleryScreen from './screens/PhotoGallery';
import SettingsScreen from './screens/SettingsSceen';

//Screen names
const homeName = "Home";
const translateName = "Translate"
const galleryName = "Photo Gallery";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn == translateName) {
                iconName = focused ? 'camera': 'camera-outline'

            } else if (rn === galleryName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          
        }
        )}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={translateName} component={TranslateScreen}></Tab.Screen>
        <Tab.Screen name={galleryName} component={GalleryScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;