import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const BOX_SIZE = 200;
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('screen');
const INITIAL_COORDINATES = {
  X: (deviceWidth - BOX_SIZE) / 2,
  Y: (deviceHeight - BOX_SIZE) / 2,
};

export const AnimatedBox = () => {
  const translateX = useSharedValue(INITIAL_COORDINATES.X);
  const translateY = useSharedValue(INITIAL_COORDINATES.Y);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(INITIAL_COORDINATES.X);
      translateY.value = withSpring(INITIAL_COORDINATES.Y);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <View style={styles.box} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: 'purple',
    width: BOX_SIZE,
    height: BOX_SIZE,
  },
});
