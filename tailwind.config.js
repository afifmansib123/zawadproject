// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      
      colors: {
        buttonBgColor: "#FFFFFF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },

      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Enable the container plugin explicitly
    container: false,
  },
  // Use this section to define your custom classes
  components: {
    // Define custom classes within the @layer components
    '@layer components': {
      '.btn': {
        backgroundColor: 'var(--buttonBgColor)',
        // Add other styles as needed
      },
      '.text-textColor': {
        color: 'var(--textColor)', // Set the color value or use a custom property
        // Add other styles as needed
      },
    },
  },
  variants: {
    extend: {
      display: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    },
  },
};
