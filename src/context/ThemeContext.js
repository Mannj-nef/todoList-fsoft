import React, { createContext } from "react";

const context = createContext();

const ThemeContext = ({ children, value }) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ThemeContext;
