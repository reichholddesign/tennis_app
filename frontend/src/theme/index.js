// theme/index.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        color: "600",
        lineHeight: "tall",
      },
      a: {
        color: "teal.500",
      },
    },
  },
});

// Global style overrides
// import styles from './styles'

// Foundational style overrides
// import borders from './foundations/borders'

// Component style overrides
// import Button from './components/button'

const overrides = {
  //   styles,
  //   borders,
  // Other foundational style overrides go here
  //   components: {
  //     Button,
  //     // Other components go here
  //   },
};

export default theme;
