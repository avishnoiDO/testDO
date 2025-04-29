import { render } from '@testing-library/react';
import App from './App';

test('renders the application without crashing', () => {
  render(<App />);
  // This basic test just checks if the App component renders without errors
});

// You can add more specific tests, for example:
test('contains welcome text', () => {
  render(<App />);
  // This will depend on what's actually in your App component
  // For example, if your App contains "Welcome to My App" text:
  // const welcomeElement = screen.getByText(/welcome to my app/i);
  // expect(welcomeElement).toBeInTheDocument();
});