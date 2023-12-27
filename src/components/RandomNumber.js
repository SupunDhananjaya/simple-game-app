import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function RandomNumber(props) {
  const handlePress = () => {
    if (props.isDisabled) {
      return;
    }
    props.onPress(props.id);
  };

  return (
    <TouchableOpacity style={styles.valueTouch} onPress={handlePress}>
      <Text
        style={[styles.value, props.isDisabled && styles.disabled]}
        key={props.id}>
        {props.randomNumber}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 35,
    backgroundColor: '#888',
    marginHorizontal: 15,
    marginVertical: 25,
    padding: 5,
    textAlign: 'center',
  },
  valueTouch: {
    width: '40%',
  },
  disabled: {
    opacity: 0.3,
  },
});
