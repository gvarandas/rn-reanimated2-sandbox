import * as React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {AnimatedBoxes} from './screens/AnimatedBoxes';

const Stack = createStackNavigator();

const SCREENS = [
  {name: 'AnimatedBoxes', component: AnimatedBoxes},
  {name: 'AnimatedBoxes2', component: AnimatedBoxes},
];

function MenuItem({title = '', name}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(name)}>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Menu() {
  return (
    <FlatList
      data={SCREENS}
      renderItem={({item}) => <MenuItem title={item.name} name={item.name} />}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        {SCREENS.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  menuHeader: {},
  menuItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ececec',
    padding: 20,
  },
  menuItemTitle: {
    fontSize: 18,
  },
});
