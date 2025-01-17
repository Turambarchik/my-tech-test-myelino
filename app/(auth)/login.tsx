import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '@/components/molecules';
import { axiosClient } from '@/config/axiosClient';
import { errorHandler } from '@/helpers/errorHandler';
import { useForm } from '@/hooks/useForm';
import Logo from '../../assets/images/logo.png';
import { useStoreActions } from '@/store';
import { Ionicons } from '@expo/vector-icons';


export default function LoginScreen() {
  const { top } = useSafeAreaInsets();
  const { identifier, password, onChange, reset } = useForm({
    identifier: '',
    password: '',
  });
  const navigation = useNavigation();
  const setToken = useStoreActions((a) => a.auth.setToken);

  const onPress = async () => {
    if ([identifier, password].includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axiosClient.post(
        '/auth/sign-in',
        { identifier, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const token = response.data.token;
      setToken(token);

      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: '(main)' as never }],
    });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <Image source={Logo} style={styles.logo} />
      <CustomInput
        value={identifier}
        onChangeText={(value) => onChange(value, 'identifier')}
        renderLeftIcon={() => (
          <Ionicons name="person-outline" size={18} color="gray" />
        )}
      />
      <CustomInput
        type="password"
        value={password}
        onChangeText={(value) => onChange(value, 'password')}
        renderLeftIcon={() => (
          <Ionicons name="lock-closed-outline" size={18} color="gray" />
        )}
        containerStyle={{ marginVertical: 15 }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    flex: 1,
  },
  logo: {
    aspectRatio: 0.8,
    height: 150,
    alignSelf: 'center',
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  textButton: {
    color: '#FFF',
    fontFamily: 'RobotoBold',
    fontSize: 18,
  },
});