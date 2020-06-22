import * as React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const ASSETS = [
  require('../assets/droplets.jpeg'),
  require('../assets/horizon.jpg'),
  require('../assets/space.jpg'),
];

const {width, height} = Dimensions.get('screen');

export const SwipingImages = () => {
  <View style={styles.container}>
    <ScrollView>
      {ASSETS.map((source) => (
        <View key={source} style={styles.picture}>
          <Image source={source} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
  },
  picture: {
    width,
    height,
    overflow: 'hidden',
  },
});
