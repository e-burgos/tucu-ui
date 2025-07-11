import { Button, CardContainer } from 'tucu-ui';

export function ThemeProvider() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Theme Provider</h1>
      <p className="text-base text-gray-600">
        The ThemeProvider component is the core of tucu-ui's theming system. It
        manages theme settings, provides context to child components, and
        handles routing.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Provider Features</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Theme Settings:</strong> Mode, layout, direction, color
            preset
          </li>
          <li>
            <strong>Routing:</strong> Built-in React Router integration
          </li>
          <li>
            <strong>Persistence:</strong> Settings stored in local storage
          </li>
          <li>
            <strong>Settings UI:</strong> Optional settings drawer/button
          </li>
          <li>
            <strong>Customization:</strong> Disable specific settings
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-2">
        <pre className="text-xs overflow-auto">
          {`<ThemeProvider
  menuItems={menuItems}
  logo={logo}
  showSettings={true}
  brandColor="Blue"
  layout="minimal"
/>`}
        </pre>
      </div>
      <Button className="w-full mt-2">Theme Provider Documentation</Button>
    </CardContainer>
  );
}
