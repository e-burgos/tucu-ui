import { Button, CardContainer } from 'tucu-ui';

export function Theming() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Theming System</h1>
      <p className="text-base text-gray-600">
        tucu-ui includes a powerful theming system built on Tailwind CSS. You
        can customize colors, typography, spacing, and more to match your brand.
        The theme provider component makes it easy to switch between themes and
        manage settings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Theme Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Light and dark mode support</li>
            <li>Custom color presets</li>
            <li>RTL/LTR direction support</li>
            <li>Layout customization</li>
            <li>Settings persistence via local storage</li>
          </ul>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Theme Configuration</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Tailwind CSS configuration</li>
            <li>Custom CSS variables</li>
            <li>Zustand state management</li>
            <li>Theme provider component</li>
            <li>Settings UI components</li>
          </ul>
        </div>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Display Mode</h3>
        <p className="text-sm text-gray-600 mb-2">
          tucu-ui supports both light and dark modes out of the box. The mode
          setting controls the color scheme of your application and
          automatically applies the appropriate styles to all components.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm mb-1">Light Mode</h4>
            <p className="text-xs text-gray-500">
              Default bright theme with light backgrounds and dark text. Ideal
              for daytime use and standard applications.
            </p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <h4 className="font-medium text-sm mb-1 text-white">Dark Mode</h4>
            <p className="text-xs text-gray-400">
              Reduced brightness theme with dark backgrounds and light text.
              Perfect for low-light environments and reducing eye strain.
            </p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <p>
            Mode is toggled via the theme settings and persisted in local
            storage. The system automatically adds the appropriate class to the
            HTML tag:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs overflow-auto">
            {`// In the useTheme hook
if (mode === 'dark') {
  htmlTag.classList.remove('light');
  htmlTag.classList.add('dark');
} else {
  htmlTag.classList.remove('dark');
  htmlTag.classList.add('light');
}`}
          </pre>
        </div>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Text Direction</h3>
        <p className="text-sm text-gray-600 mb-2">
          tucu-ui provides built-in support for both Left-to-Right (LTR) and
          Right-to-Left (RTL) text directions, making it suitable for
          multilingual applications and international audiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm mb-1">LTR (Left-to-Right)</h4>
            <p className="text-xs text-gray-500">
              Standard direction for Latin-based languages like English,
              Spanish, and French. Text flows from left to right.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm mb-1">RTL (Right-to-Left)</h4>
            <p className="text-xs text-gray-500">
              Direction for languages like Arabic, Hebrew, and Persian. Text
              flows from right to left, and UI elements are mirrored.
            </p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <p>
            Direction is managed through the theme settings and automatically
            applies the appropriate styles and layout adjustments to all
            components.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs overflow-auto">
            {`// Example of setting direction
const { setDirection } = useTheme();
setDirection('rtl'); // or 'ltr'`}
          </pre>
        </div>
      </div>
      <Button className="w-full mt-2">Learn About Theming</Button>
    </CardContainer>
  );
}
