import { createStore, createTypedHooks, persist } from "easy-peasy";
import * as SecureStore from "expo-secure-store";
import { AuthModel, authModel } from "./models/auth/auth.model";
import { ThemeModel, themeModel } from "./models/theme/theme.model";
import { isIOS } from "@/constants/constants";
import { PlansModel, plansModel } from "./models/plans/plans.model";

export interface StoreModel {
  theme: ThemeModel;
  auth: AuthModel;
  plans: PlansModel;
}

export const STORE_KEY = "myelino-storage-key";

export const setSecureStorageItem = async <T>(key: string, value: T) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getSecureStorageItem = async <T>(key: string, defaultValue: T): Promise<T> => {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return defaultValue;
};

export const removeSecureStorageItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

if (isIOS) {
  (window as unknown as { requestIdleCallback: null | undefined }).requestIdleCallback = null;
}

const storeModel: StoreModel = {
  auth: authModel,
  theme: themeModel,
  plans: plansModel,
};

export const store = createStore<StoreModel>(
  persist(storeModel, {
    storage: {
      getItem: async () => {
        const value = await getSecureStorageItem(STORE_KEY, null);
        if (value === null || value === "") {
          return null;
        }
        return value;
      },
      setItem: async <T>(_: string, value: T) => {
        await setSecureStorageItem(STORE_KEY, value);
      },
      removeItem: async () => {
        await removeSecureStorageItem(STORE_KEY);
      },
    },
    allow: ["auth", "theme"],
  })
);

export const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<StoreModel>();
