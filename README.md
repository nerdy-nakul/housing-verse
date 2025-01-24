![image](https://github.com/user-attachments/assets/2f780e5d-e050-4a89-8561-b56e17600064)
# Housing Verse

Housing Verse is a React Native application designed to display a list of housing options and allow users to explore detailed information about each home. Users can search for homes and unlock the details of a selected home if they are within 30 meters of its location.

## Features
- **Login:** Secure login functionality.
- **Housing List:** View a list of housing options fetched from the server.
- **Search Bar:** Search for homes by name or attributes.
- **Details Screen:** Navigate to a details screen for more information on a selected home.
- **Unlock Button:** Unlock a home if the user is within 30 meters of its location.
- **Simulated API Call:** Simulates an API call to unlock the home, providing success or error feedback.

## Tech Stack
- **Frontend:** React Native
- **Backend:** Mock data from a server
- **Location Services:** For geolocation functionality

## Installation and Setup

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- Expo CLI (if not installed, run `npm install -g expo-cli`)

### Steps to Set Up the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nerdy-nakul/react-native-project
   cd housing-verse
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Run on Emulator/Device**
   - Open the Expo Go app on your phone.
   - Scan the QR code displayed in the terminal or browser to launch the app.

### Steps to Set Up and Run the Server

1. **Navigate to the Server Directory**
   ```bash
   cd express-server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

## UI - Images
<div style="display: flex;">
    <img src="https://github.com/user-attachments/assets/130b1c94-a9ee-48b6-b4bd-f573dbf5b2b9" alt="Login 0" style="height: 400px; object-fit: cover; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/3b7b700f-f824-43f0-b8bd-69b9dc031c81" alt="Login 2" style="height: 400px; object-fit: cover; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/abd688ee-9675-455e-abbb-6484473f51dc" alt="Listing" style="height: 400px; object-fit: cover; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/645f5def-a2af-4798-ab27-0a100697e21a" alt="Detail 1" style="height: 400px; object-fit: cover; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/bcc293d9-8ce5-49b0-8cfe-8a9d6ce42ce6" alt="Detail 2" style="height: 400px; object-fit: cover; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/1aac3ecb-118c-4a97-b28c-f3291e862351" alt="WhatsApp Image" style="height: 400px; object-fit: cover;">
</div>

## Usage
1. Log in using the provided credentials:
   - **Email:** admin@gmail.com
   - **Password:** admin
2. View the list of housing options displayed on the home screen.
3. Use the search bar at the top to filter housing options.
4. Select a home from the list to navigate to the details screen.
5. If within 30 meters of the home, the "Unlock" button will appear.
6. Press the "Unlock" button to simulate an API call. A success or error message will be displayed based on the response.

## Demo - Video
https://github.com/user-attachments/assets/8f039f07-ce78-4767-8c52-e23ec1d272a2

## Application Flow
1. **Login Screen:** Initial screen for user authentication.
2. **Home List Screen:** Displays the list of housing options.
3. **Details Screen:** Provides detailed information about the selected home, including the "Unlock" button functionality.

## Mock Server Details
- The app uses mock data for housing information.
- Simulated API responses for unlocking homes (success or error).

## Dependencies
- **react-native**: Core framework for mobile development.
- **expo-location**: For location-based services.
- **axios**: For API calls.
- **express**: For Backend

![image](https://github.com/user-attachments/assets/e859bfbf-e86a-4f63-971a-a91789752296)
