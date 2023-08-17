![Logo](assets/logo.png)

This is a template to be used with expo. It includes all the necessary stuff to start working with expo framework. It has the most popular packages included so it's easier to start coding the app itself without all the necessary boilerplate setup. It has:

Version in the `package.json` is one to one the latest expo on which the template was tested.

- TypeScript support
- Expo
- React Navigation
  - with dark and light theme set up
  - with screen tracking hook
  - state persistance on development mode
  - prevent go back (to be used on forms for example)
- native-base
- color scheme detection (dark / light mode toggle)
- hermes enabled on Android by default
- i18next with translations, language detection and translations
- wait to load fonts and all the assets
- auth flow ready for implementation details
  - using expo-secure-store module to save user token
  - right now it has simple signIn/signOut flow
- prettier
- babel-module-resolver
- tests with jest and @testing-library/react-native
- animations with `reanimated` and `moti`
- `@gorhom/bottom-sheet`

See all the details in the documentation.

## Installation

Init expo with this template using:

### Working with designer in your project

Expo template, you are going to use - bundles native-base ui lib out of the box.
To have the best starting experience in your project - write a dm to your designer that they should use [NativeBase Figma Design Kit](https://www.figma.com/community/file/1050753649783931446)

## Roadmap

- Additional browser support
- Add more integrations

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Run Locally

Clone the project

```bash
  git clone https://github.com/aregghaz/e-order-app.git
```

Go to the project directory

```bash
  cd expo-typescript-template
```

Install dependencies

```bash
  yarn
```

Start the expo server

```bash
  yarn start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to me at aregghaz@gmail.com
