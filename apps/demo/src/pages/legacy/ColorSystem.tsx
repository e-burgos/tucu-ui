import { Button, CardContainer } from 'tucu-ui';

export function ColorSystem() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Color System</h1>
      <p className="text-base text-gray-600">
        tucu-ui's color system is built on Tailwind CSS with custom color
        presets. You can choose from predefined color schemes or create your
        own.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Color Features</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Presets:</strong> Green, Black, Blue, Red, Purple, Orange
          </li>
          <li>
            <strong>Dark Mode:</strong> Automatic dark variants
          </li>
          <li>
            <strong>CSS Variables:</strong> --color-brand for theme color
          </li>
          <li>
            <strong>Accessibility:</strong> WCAG compliant contrast ratios
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="w-8 h-8 bg-brand rounded-full"></div>
        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
        <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
      </div>
      <Button className="w-full mt-2">Color System Documentation</Button>
    </CardContainer>
  );
}
