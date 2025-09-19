# OneSignal React SDK Test App

This example app demonstrates the comprehensive functionality of the OneSignal React SDK with an interactive testing interface.

## Setup

1. Run `npm install`
2. Replace the string `<YOUR_APP_ID>` with your actual app ID from the OneSignal dashboard project
3. Run `npm start` to launch the development server

## Features

The test app includes interactive sections for:

### Configuration

- Set your OneSignal App ID
- Real-time status display showing initialization state, permissions, and user data

### User Authentication

- Login with external ID and optional JWT token
- Logout functionality
- Display current user state (OneSignal ID, External ID)

### Tags Management

- Add custom tags with key-value pairs
- View all current tags
- Remove individual tags
- Real-time tag display updates

### Event Tracking

- Track custom events with optional properties
- JSON format support for event properties
- Activity logging for all tracked events

### Push Notifications

- Request notification permissions
- Opt in/out of push notifications
- Trigger slidedown prompts
- View permission status

### User Profile Management

- Add/remove email addresses
- Add/remove SMS numbers
- Set user language preferences
- Real-time profile updates

### Session Outcomes

- Send custom outcomes with optional weights
- Track user engagement metrics

### Activity Logging

- Real-time activity log with timestamps
- Error handling and success messages
- Scrollable log container with recent activity

## Usage

1. Enter your OneSignal App ID in the Configuration section
2. Use the various sections to test different OneSignal features
3. Monitor the Activity Log to see real-time feedback
4. Check the Status section to view current OneSignal state

The app provides a comprehensive testing environment for all OneSignal React SDK features, making it easy to verify functionality during development.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
