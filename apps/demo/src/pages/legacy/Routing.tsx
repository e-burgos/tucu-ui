import { Button, CardContainer } from 'tucu-ui';

export function Routing() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Routing System</h1>
      <p className="text-base text-gray-600">
        tucu-ui includes a built-in routing system based on React Router DOM.
        The ThemeProvider component automatically sets up routes based on your
        menu configuration, making it easy to create multi-page applications.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Routing Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>React Router DOM integration</li>
            <li>Automatic route generation from menu items</li>
            <li>Nested routes for dropdown menus</li>
            <li>404 page handling</li>
            <li>Optional custom routes</li>
          </ul>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Menu Configuration</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Name and href properties</li>
            <li>Optional icon</li>
            <li>Component for route content</li>
            <li>Nested dropdownItems</li>
            <li>Hide option for menu items</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-2">
        <pre className="text-xs overflow-auto">
          {`// Menu item structure
{
  name: 'Home',
  href: '/',
  icon: <HomeIcon />,
  component: <HomePage />,
  dropdownItems: [
    {
      name: 'Submenu',
      href: '/submenu',
      component: <SubPage />
    }
  ]
}`}
        </pre>
      </div>
      <Button className="w-full mt-2">Routing Documentation</Button>
    </CardContainer>
  );
}
