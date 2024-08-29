# CHRONOS

CHRONOS is a React-based web application designed to help users manage their schedules efficiently. The app provides a modern landing page that displays the current time and date, and a scheduling page where users can create, edit, and manage tasks with a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Clock and Date**: Displays the current time and date on the landing page, updated every second.
- **Task Scheduling**: Allows users to create tasks with customizable time slots, descriptions, and color-coded blocks.
- **Error Handling**: Includes modal pop-ups to inform users of time conflicts or missing input data when adding tasks.
- **Local Storage**: Saves scheduled tasks in the browser's local storage, ensuring persistence between sessions.
- **Responsive Design**: Adapts to different screen sizes, providing a seamless experience on both desktop and mobile devices.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/chronos.git
    cd chronos
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

### Landing Page

- The landing page displays the current time and date with a live clock.
- The CHRONOS logo serves as a home button, allowing navigation back to the main page.

### Schedule Page

- Navigate to the Schedule page via the app's navigation.
- Add tasks by entering a description, start time, end time, and selecting a color.
- Tasks are displayed on a grid based on their scheduled time slots.
- Tasks can be removed if needed, and time conflicts are automatically detected and handled.

### Error Handling

- If task times overlap or incorrect input is detected, an error modal appears, guiding the user to correct the input.


## Technologies Used

- **React**: Front-end library for building the user interface.
- **React Router**: For managing navigation between pages.
- **Bootstrap**: For styling and responsive design.
- **Day.js**: For date and time manipulation.
- **CSS**: Custom styles for each component.
- **Local Storage**: For saving tasks and maintaining state between sessions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Feel free to contribute, report bugs, or suggest features!
