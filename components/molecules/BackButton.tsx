import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BackHeaderArrowIcon } from '@/assets/svgs/common';

export const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <BackButtonContainer onPress={() => navigation.goBack()}>
      <BackHeaderArrowIcon />
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 100px;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.primary};
`;
