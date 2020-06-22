import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
// const CONFETTI_SIZE = 16;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];
const NUM_CONFETTI = 50;

// function transition(
//   x,
//   y,
//   angle,
//   xVel,
//   yVel,
//   angleVel,
//   delay,
//   elasticity,
//   timeDiffInSeconds,
// ) {
//   'worklet';

//   const dx = timeDiffInSeconds * xVel.value;
//   const dy = timeDiffInSeconds * yVel.value;
//   const dAngle = timeDiffInSeconds * angleVel;

//   if (delay.value > 0) {
//     delay.value -= timeDiffInSeconds;
//   } else {
//     x.value += dx;
//     y.value += dy;
//     angle.value += dAngle;
//   }

//   if (x.value > screenWidth - CONFETTI_SIZE) {
//     x.value = screenWidth - CONFETTI_SIZE;
//   } else {
//     xVel.value = xVel.value * -elasticity.value;
//   }

//   if (x.value < 0) {
//     x.value = 0;
//   } else {
//     xVel.value = xVel.value * -elasticity.value;
//   }
// }

function useVerticalTransition(initialValue = 0, finalValue = 100) {
  const verticalValue = useSharedValue(initialValue);
  React.useEffect(() => {
    verticalValue.value = finalValue;
  }, [verticalValue, finalValue]);

  const timedTransition = useDerivedValue(() =>
    withTiming(verticalValue.value, {duration: 3500}),
  );

  return timedTransition;
}

const Confetto = ({index}) => {
  // const x = useSharedValue(
  //   screenWidth * (index % 2 ? 0.25 : 0.75) - CONFETTI_SIZE / 2,
  // );
  const y = useVerticalTransition(0, screenHeight);
  const x = useSharedValue(Math.floor(Math.random() * (screenWidth + 1)));
  const angleVel = useSharedValue((Math.random() * 3 - 1.5) * Math.PI);
  const angle = useDerivedValue(() => {
    return angleVel.value * (y.value / 150);
  });
  // const xVel = useSharedValue(Math.random() * 400 - 200);
  // const yVel = useSharedValue(Math.random() * 150 + 150);
  // const delay = useSharedValue(Math.floor(index / 10) * 0.3);
  // const elasticity = useSharedValue(Math.random() * 0.3 + 0.1);
  const color = COLORS[index % COLORS.length];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotate: angle.value},
        {rotateX: angle.value},
        {rotateY: angle.value},
      ],
    };
  });

  return (
    <Animated.View style={[styles.confettiContainer, animatedStyle]}>
      <View style={[styles.confetti, {backgroundColor: color}]} />
    </Animated.View>
  );
};

export function Confetti() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {[...new Array(NUM_CONFETTI)].map((_, i) => {
        return (
          <React.Fragment key={i}>
            <Confetto index={i} />
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  confetti: {
    width: 3,
    height: 8,
  },
});
