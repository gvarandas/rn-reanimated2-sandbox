import * as React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ASSETS = [
  require('../assets/droplets.jpeg'),
  require('../assets/water.jpg'),
  require('../assets/space.jpg'),
];

const {width, height} = Dimensions.get('window');
const MAX_WIDTH = ASSETS.length * width;
const SNAP_POINTS = ASSETS.map((_, i) => i * -width);

console.log('SNAP', SNAP_POINTS);

export const SwipingImages = () => {
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
    },
    onEnd: (event, ctx) => {
      const to = snapPoint(translateX.value, event.velocityX, SNAP_POINTS);
      translateX.value = withTiming(to, {duration: 500});
      ctx.offsetX = to;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.pictures, animatedStyle]}>
        {ASSETS.map((source) => (
          <View key={source} style={styles.picture}>
            <Image source={source} style={styles.picture} />
          </View>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pictures: {
    flexDirection: 'row',
    width: MAX_WIDTH,
    height,
  },
  picture: {
    width,
    height,
    overflow: 'hidden',
  },
});

function snapPoint(value, velocity, points) {
  'worklet';
  const point = value + 0.2 * velocity;
  const diffPoint = (p) => Math.abs(point - p);
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = deltas.reduce((acc, d) => Math.min(acc, d));
  return points.reduce((acc, p) => (diffPoint(p) === minDelta ? p : acc), 0);
}
