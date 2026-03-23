# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# React Assignment - Smart User Insights Panel

This project is a React user directory app with an AI-powered insights feature.

Users can:
- view a list of users
- search and filter users
- select a user to see details
- add a new user
- generate AI-based insights for each user using Groq

## Setup

Create a `.env` file in the project root and add your Groq API key:

```env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
```

After adding the key, restart the app.

## Run The Project

In the project directory, you can run:

```bash
npm start
```

This starts the app in development mode at `http://localhost:3000`.

## AI Feature

Each user card has a `Generate Insights` button.

When clicked:
- the app sends the user data to Groq
- Groq returns a short summary in 1-2 sentences
- the result is shown below the user card
- the result is cached so the same user is not requested again unless regenerated

The app also shows:
- loading state while the insight is being created
- error message if the API call fails

## Short Explanation

### How I designed the prompt

I made the prompt simple and clear. I gave the AI the user's name, role, status, and language, and asked it to write a short summary in 1 to 2 sentences. I also told it to use only the given data and not make up extra information. If it guesses something, it should use soft words like "likely" or "may."

### How I handled API calls and errors

I used `async/await` to call the Groq API. When the user clicks the button, the app checks if the insight is already saved. If yes, it does not call the API again. While the API is working, the app shows a loading message. If the call is successful, the summary is shown on the screen and saved in state and `localStorage`. If something goes wrong, the app catches the error and shows an error message instead of crashing.

### What improvements I would add

If I had more time, I would improve the feature by adding retry support when the API fails and giving the user a better regenerate option. I would also allow small prompt customization so the summary can be more detailed or more simple based on need. To keep the setup cleaner, I would manage the API key through the `.env` file properly and make sure it is easy to configure for different environments. I would also add tests and, if needed, TypeScript to make the code more reliable and easier to maintain.

## Tech Used

- React
- React Hooks
- Fetch API
- Groq API
- localStorage

