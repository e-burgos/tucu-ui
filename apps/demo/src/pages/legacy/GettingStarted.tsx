import { Button, CardContainer } from 'tucu-ui';

export function GettingStarted() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Getting Started with tucu-ui</h1>
      <p className="text-base text-gray-600">
        Learn how to install and set up tucu-ui in your React project. This
        guide covers installation, configuration, and basic usage to help you
        get up and running quickly.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Installation</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
            <code className="text-xs">npm install tucu-ui</code>
          </div>
          <p className="text-xs mt-2">Or with yarn:</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
            <code className="text-xs">yarn add tucu-ui</code>
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Requirements</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>React 18 or higher</li>
            <li>React DOM 18 or higher</li>
            <li>Tailwind CSS 4.0 or higher</li>
            <li>Node.js 16 or higher</li>
          </ul>
        </div>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Basic Setup</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
          <pre className="text-xs overflow-auto">
            {`import { ThemeProvider } from 'tucu-ui';
import 'tucu-ui/styles';

function App() {
  return (
    <ThemeProvider
      menuItems={[
        {
          name: 'Home',
          href: '/',
          component: <HomePage />
        }
      ]}
    />
  );
}`}
          </pre>
        </div>
      </div>
      <Button className="w-full mt-2">Read Getting Started Guide</Button>
    </CardContainer>
  );
}
