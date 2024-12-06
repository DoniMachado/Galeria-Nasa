import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import ListScreen from "./screens/List.jsx";
import DetailsScreen from "./screens/Details.jsx"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarActiveTintColor: '#f4511e',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            alignItems: 'center', 
            justifyContent: 'center',
          },
        }}>
         <Tab.Screen
              name="list"              
              component={ListScreen}
              options={{
                title: 'Galeria',
                tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome
                    name={'list-alt'}
                    size={size}
                    color={color}
                  />
                ),
              }}
              >
          </Tab.Screen>
          <Tab.Screen
              name="details"
              options={{
                title: 'Detalhes',
                tabBarButton: () => null,
              }}
              component={DetailsScreen}
              >
          </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

