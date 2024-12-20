import React, { useState } from 'react';
import { TextInput, Pressable, ViewStyle, TextInputProps, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { isAOS } from '@/constants/constants';

type Props = {
  value: string;
  type?: 'email' | 'password';
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  renderLeftIcon?: () => React.ReactNode;
} & TextInputProps;

export const CustomInput = ({
  type = 'email',
  value,
  onChangeText,
  containerStyle,
  renderLeftIcon,
  ...textInputProps
}: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Container style={containerStyle}>
      {renderLeftIcon ? (
        renderLeftIcon()
      ) : (
        <Ionicons
          name={type === 'email' ? 'mail-outline' : 'lock-closed-outline'}
          size={18}
        />
      )}
      <Input
        value={value}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && !visible}
        placeholder={type === 'email' ? 'Email Address/Username' : 'Password'}
        {...textInputProps}
      />
      {type === 'password' && (
        <Pressable onPress={() => setVisible(!visible)}>
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={18}
          />
        </Pressable>
      )}
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  gap: 10px;
  shadow-color: #1e1e1e;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  ${isAOS ? "elevation: 3;" : ""}
`;

const Input = styled.TextInput`
  flex: 1;
`;
