import { Button, CardContainer } from 'tucu-ui';

export function Overview() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome to tucu-ui</h1>
      <p className="text-base text-gray-600">
        tucu-ui is a modern React component library built with TypeScript,
        Tailwind CSS, and Headless UI. It provides a comprehensive set of
        accessible, customizable UI components designed for modern web
        applications.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Key Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Fully typed TypeScript components</li>
            <li>Tailwind CSS for styling</li>
            <li>Dark mode support</li>
            <li>Responsive by design</li>
            <li>Accessible components</li>
          </ul>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Core Dependencies</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>React 18+</li>
            <li>Headless UI</li>
            <li>Tailwind CSS 4.1+</li>
            <li>Framer Motion</li>
            <li>Zustand for state management</li>
          </ul>
        </div>
      </div>
      <Button className="w-full mt-2">Get Started with tucu-ui</Button>
    </CardContainer>
  );
}
