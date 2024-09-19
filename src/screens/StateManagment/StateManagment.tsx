import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const ContextProvider = createContext();

const ContextStates = ({ children }) => {
  const [Language, SetLanguage] = useState<String>("en");
  return (
    <ContextProvider.Provider value={{ Language, SetLanguage }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextStates;

const styles = StyleSheet.create({});
