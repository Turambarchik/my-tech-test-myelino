# Myelino Technical Test

## Project Purpose

This project is a technical test for building a React Native application using the Expo framework. The application demonstrates the use of key React Native features, such as navigation, state management, and optimized rendering, while adhering to clean architecture and best practices.

## Features

- **Expo Router**: Streamlined navigation with stack and screen components.
- **State Management**: Implemented with `easy-peasy` for clear and predictable state handling.
- **Dynamic Data Handling**: Integration of `axios` for API calls and dynamic updates.
- **Optimized Rendering**: Utilization of `@shopify/flash-list` for efficient list rendering.
- **Lazy Loading**: `expo-image` ensures that images are only loaded when visible.
- **TypeScript**: Strong typing ensures code reliability and scalability.
- **Theming**: `styled-components` provides consistent and reusable styling.

## Project Structure

The project follows a modular structure:

```
src/
  ├── assets/
  ├── components/
  │   ├── atoms/
  │   ├── molecules/
  ├── config/
  ├── store/
  ├── app/
  ├── (auth)/
  │   ├── _layout.tsx
  │   ├── login.tsx
  ├── (main)/
  │   ├── components/
  │   ├── events-details/
  │   ├── planner/
  │   │   ├── _layout.tsx
  │   │   ├── constants.ts
  │   │   └── helpers.ts
  ├── _layout.tsx
  └── index.tsx
  ├── hooks/
  ├── constants/
  └── helpers/
```

### Key Folders

This structure ensures a clear separation of concerns and leverages `expo-router`'s powerful file-based routing for efficient development.

- **`app`**: Central folder managed by `expo-router`, following the file-based routing approach. It is divided into:

  - **`(auth)`**: Contains screens and layouts related to authentication (e.g., `login.tsx`, `_layout.tsx`).
  - **`(main)`**: Includes primary application features, further divided into subfolders:
    - **`components`**: Shared UI components for the main application flow.
    - **`events-details`**: Screens and related logic for displaying event details.
    - **`planner`**: Specific screens and utilities for the planner module (e.g., `_layout.tsx`, `constants.ts`, `helpers.ts`).
  - **Global Layouts**:
    - **`_layout.tsx`**: Defines the root layout of the application.
    - **`index.tsx`**: The entry point for the home screen.

- **`components`**: Shared reusable UI components that are not tied to specific features.

- **`store`**: Manages global state using `easy-peasy` for scalable state management.

- **`hooks`**: Reusable custom hooks for encapsulating logic, such as managing planner interactions or fetching data.

- **`helpers`**: Utility functions to handle repetitive tasks or computations, aiding in cleaner code structure.

## Architectural Decisions

- **Modular Component Organization**: Components are grouped by scope and responsibility to improve reusability and maintainability.
- **State Management**: `easy-peasy` is used for state management to simplify complex state interactions.
- **Lazy Loading**: Image loading is optimized with `expo-image` for better performance on mobile devices.
- **Theming with `styled-components`**: Ensures consistent styling and theming throughout the application.

## Installation

To get started, clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-repo/myelino-technical-test.git

# Navigate into the project directory
cd myelino-technical-test

# Install dependencies
npm install
```

## Running the Project

To start the project, use the following commands:

### Run on iOS Simulator

```bash
npm run ios
```

### Run on Android Emulator

```bash
npm run android
```

### Run on Web

```bash
npm run web
```

## Testing

Run the test suite with:

```bash
npm test
```

## Key Dependencies

- **Expo**: Simplifies the process of building and running React Native apps.
- **Expo Router**: File-based navigation system.
- **@shopify/flash-list**: Optimized list rendering for better performance.
- **axios**: Handles HTTP requests.
- **easy-peasy**: Simplifies state management.
- **styled-components**: Provides a clean and efficient way to manage styles.

## Comments and Explanations

- **Planner Screen**: The `Planner` screen dynamically fetches and displays plans using efficient rendering with `FlashList`.
- **Lazy Loading Images**: Images are rendered only when visible on the screen, reducing memory consumption and improving performance.
- **Dynamic Filtering**: The chip section and timeline allow dynamic filtering based on user input or selected months.

## Design Decisions

- **Reusable Components**: Components like `PlannerHeader` and `Timeline` are reusable, reducing code duplication.
- **Strong Typing with TypeScript**: Reduces runtime errors and improves developer experience.
- **Optimized Lists**: `FlashList` is used for lists to handle large datasets efficiently.

# Libraries Used in the Test Application

Here is an explanation of the libraries added to this test application and their purposes:

### 1. **@shopify/flash-list**

- **Purpose**: A high-performance list rendering library for React Native.
- **Use Case**: Ideal for applications requiring efficient rendering of large datasets with smooth scrolling and optimized memory usage.

### 2. **easy-peasy**

- **Purpose**: A simple and intuitive state management library for React and React Native applications.
- **Use Case**: Helps in managing complex application states in an organized way, making it easier to develop and maintain scalable apps.

### 3. **expo-image**

- **Purpose**: Provides an optimized image component for React Native applications with advanced features like caching and placeholders.
- **Use Case**: Ensures images load efficiently and look great, improving app performance and user experience.

### 4. **expo-linear-gradient** _(repeated in the list)_

- **Purpose**: Allows the creation of visually appealing gradient backgrounds and overlays in the application.
- **Use Case**: Useful for enhancing UI designs with smooth transitions between colors, creating engaging visual experiences.

These libraries were integrated to enhance the application’s performance, improve the user interface, and simplify development by leveraging modern tools and optimized solutions.

## Planner Screen Analysis

### Overview

The Planner screen is a thoughtfully crafted React Native component with features designed for efficiency, scalability, and an excellent user experience. It showcases strong coding practices and focuses on both performance and maintainability.

---

### Key Features and Strengths

#### 1. **Delete Functionality**

- **clearPlanner**: A dedicated function to clear all plans efficiently. This ensures a clean slate for users when needed, simplifying state management and providing a robust action for the application.
- **Plan-Specific Deletion**: Each plan and event can be deleted using functions like deleteEvent, giving users precise control over their data.

#### 2. **Search with Debouncing**

- **Debounced Search**: The search logic is implemented with debouncing, ensuring that filtering operations are only triggered after a user stops typing. This minimizes unnecessary computations and improves performance, especially with large datasets.
- **Seamless Filtering**: The useSearchPlans hook dynamically filters quickPlans and monthData, enabling real-time updates and enhancing the user experience.

#### 3. **Performance-Optimized List Rendering**

- **FlashList Integration**: The PlansList component uses @shopify/flash-list for rendering grouped plans. This optimizes memory usage and ensures smooth scrolling, even with large datasets.

#### 3. **Performance-Optimized List Rendering**

- **FlashList Integration**: The `PlansList` component uses `@shopify/flash-list` for rendering grouped plans. This optimizes memory usage and ensures smooth scrolling, even with large datasets.
- **Lazy Loading Logic**: Implemented lazy loading for sub-lists within grouped plans. During the initial render, no more than two items are displayed in each sub-list. If the list contains more than two items, a "See More" button is displayed, allowing users to expand the list and view all items on demand.
  - **Why It's Great**:
    - **Efficient Rendering**: Reduces the initial rendering cost by limiting the number of visible items, ensuring smooth performance on devices with limited resources.
    - **User-Centric Design**: Keeps the UI clean and focused by avoiding visual clutter in the initial view, while providing users with control to expand and view more details as needed.
    - **Dynamic Behavior**: This logic adapts to varying list sizes, ensuring consistent performance regardless of the dataset size.
- **Expandable Plans**: The "See More" functionality allows users to load additional items only when needed, keeping the initial view compact and reducing UI clutter.

#### 4. **Reusable and Modular Components**

- **PlannerHeader**: Displays user-specific greetings and date, providing a personalized touch.
- **ChipSection**: Offers an interactive way to filter data by categories (e.g., months or quick plans) with a visually engaging underline for active chips.
- **Timeline**: Dynamically generates a timeline view for plans, showcasing key events with clear visual markers.

#### 5. **Data Handling and Transformation**

- **Data Grouping**: The groupPlansByDate helper organizes plans into groups based on dates, improving data presentation and enabling compact or expanded views.
- **Dynamic Chips**: Chips dynamically update based on available data, showing relevant counts and providing easy access to filtered views.

---

## EventsDetails Screen Overview

### Overview

The `EventsDetails` screen is designed to display a paginated list of events with features for lazy loading, deletion, and efficient rendering. It emphasizes performance and user experience by incorporating dynamic loading and modular components.

---

### Key Features and Strengths

#### 1. **Lazy Loading**

- **`handleLoadMore`**: Implements lazy loading by loading events in chunks (`ITEMS_PER_LOAD`) as the user scrolls to the end of the list. This ensures that only the required items are rendered initially, reducing memory usage and improving performance.
- **Why It’s Great**:
  - **Performance Optimization**: Limits the number of items rendered at once, enhancing scrolling performance on resource-constrained devices.
  - **Scalability**: Easily handles large datasets without compromising responsiveness.

#### 2. **Dynamic Deletion**

- **`handleEventItemDelete`**: Enables users to delete individual events directly from the visible list. The UI updates immediately without reloading the entire dataset.
- **Why It’s Great**:
  - **Immediate Feedback**: Provides a seamless experience by instantly updating the UI after deletion.
  - **Clean State Management**: Ensures the visible list and global state stay in sync.

#### 3. **Performance-Optimized List Rendering**

- **FlashList Integration**: Utilizes `@shopify/flash-list` for rendering the events list. This ensures smooth scrolling and optimized memory usage for lists with numerous items.
- **Estimated Item Height**: The `CARD_HEIGHT` constant ensures efficient rendering by precomputing item dimensions, minimizing layout recalculations.

#### 4. **Reusable and Modular Components**

- **PlanCard**: Displays detailed information for each event, including the title, image, attendees, and price. It encapsulates functionality, ensuring clean and reusable code.
- **BreadCrumpsArrowIcon**: Provides a visual breadcrumb trail for navigation, enhancing clarity and user orientation.

#### 6. **Dynamic Header**

- Displays the current plan's name dynamically using the `title` parameter from `expo-router`. This provides context to the user and aligns the screen with the selected plan.

---

### Problems and Shortcomings

#### 1. **Incomplete Custom Fonts**

- The custom fonts provided were incomplete and did not include all font weights, such as `bold`, `light`, or `medium`. Only a limited set of font files were available:
  ```javascript
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  ```

markdown
Copy code

#### Impact on Android

- **Impact on Android Font Weight Limitations**: On Android, font weights are tied directly to specific font files. Without a full range of font weights, text styling (e.g., bold or light) depends on the limited files, leading to inconsistent appearance.

- **Visual Discrepancy**: Due to the missing font files, text in the application may not align with the design specifications, especially on Android, where the font rendering relies on explicitly defined weights.

---

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed: `npm install`
2. Clear Expo cache: `expo start -c`
3. Verify your environment setup: [Expo Environment Setup](https://docs.expo.dev/get-started/installation/)

## License

This project is licensed under the MIT License.
