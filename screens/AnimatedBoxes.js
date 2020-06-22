import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const BOX_SIZE = 100;

export const AnimatedBoxes = ({boxes = 6}) => {
  return (
    <SafeAreaView style={styles.container}>
      {[...new Array(boxes)].map((_, i) => (
        <React.Fragment key={i}>
          <AnimatedBox />
        </React.Fragment>
      ))}
    </SafeAreaView>
  );
};

export const AnimatedBox = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // const scale = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      // scale.value = withSpring(2);
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      // scale.value = withSpring(1);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        // {scale: scale.value},
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={animatedStyle}>
        <View style={styles.box} />
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
    margin: 20,
  },
  box: {
    marginBottom: 20,
    backgroundColor: 'purple',
    width: BOX_SIZE,
    height: BOX_SIZE,
  },
});
