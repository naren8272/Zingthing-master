import { create } from "zustand";
import { User } from "../../common/Utils/types";

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "auth",
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

const useAuthState = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useAuthState;
