import { Button, CardContainer } from 'tucu-ui';

export function Layout() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Layout Components</h1>
      <p className="text-base text-gray-600">
        tucu-ui provides layout components to structure your application. These
        include containers, cards, drawers, sidebars, and more.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Layout Options</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Classic:</strong> Traditional layout with sidebar and header
          </li>
          <li>
            <strong>Minimal:</strong> Clean layout with minimal chrome
          </li>
          <li>
            <strong>Custom:</strong> Build your own layout with layout
            components
          </li>
          <li>
            <strong>Responsive:</strong> All layouts are mobile-friendly
          </li>
        </ul>
      </div>
      <Button className="w-full mt-2">See Layout Documentation</Button>
    </CardContainer>
  );
}
