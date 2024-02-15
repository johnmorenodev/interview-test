# React Table App

This is a React application built to display a table using data fetched from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users). The project is implemented using React with TypeScript, Redux for state management, and Jest for unit testing.

## Features

### 1. Table Display
- The table displays user data fetched from the JSONPlaceholder API.
- Columns:
  - Name
  - Email
  - City
  - Company

### 2. Search Functionality
- Users can search for specific users by entering a name in the search input field.

### 3. Clickable Rows
- Rows in the table are clickable.
- When a row is clicked, the application retrieves and displays the posts of the respective user from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts?userId=1).

## Technologies Used

- React
- TypeScript
- Redux
- Jest
- Redux Thunk

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
### `npm install`

## Usage

1. Run the development server:
### `npm run start`
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

Run the following command to execute the unit tests:
### `npm run test`
