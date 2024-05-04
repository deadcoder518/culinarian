import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconProps from 'react-native-vector-icons/FontAwesome';

type IconButtonProps = IconProps['props'] & {
  handlePress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function IconButton(props: IconButtonProps) {
  const {name, color, handlePress, style} = props;
  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      <Icon name={name} color={color} />
    </TouchableOpacity>
  );
}
