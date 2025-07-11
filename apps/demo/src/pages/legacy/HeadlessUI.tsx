import { Button, CardContainer } from 'tucu-ui';

export function HeadlessUI() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Headless UI Components</h1>
      <p className="text-base text-gray-600">
        tucu-ui extends Headless UI components with additional styling and
        functionality. These components provide accessible, unstyled building
        blocks that you can customize to match your design system.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Headless UI Components</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Dialog/Modal:</strong> Accessible dialog windows
          </li>
          <li>
            <strong>Disclosure:</strong> Expandable/collapsible sections
          </li>
          <li>
            <strong>Dropdown:</strong> Custom dropdown menus
          </li>
          <li>
            <strong>Listbox:</strong> Enhanced select components
          </li>
          <li>
            <strong>Switch:</strong> Toggle switches
          </li>
          <li>
            <strong>Tabs:</strong> Tabbed interfaces
          </li>
          <li>
            <strong>Transition:</strong> Animated transitions
          </li>
        </ul>
      </div>
      <Button className="w-full mt-2">See Headless UI Documentation</Button>
    </CardContainer>
  );
}
