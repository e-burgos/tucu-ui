import { Button, CardContainer } from 'tucu-ui';

export function Components() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Component Library</h1>
      <p className="text-base text-gray-600">
        tucu-ui offers a rich collection of UI components built on top of
        Headless UI and styled with Tailwind CSS. Each component is designed to
        be accessible, customizable, and easy to integrate into your React
        applications.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Component Categories</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Buttons & Actions</li>
            <li>Forms & Inputs</li>
            <li>Layout & Containers</li>
            <li>Navigation</li>
            <li>Feedback & Notifications</li>
            <li>Data Display</li>
          </ul>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-bold mb-2">Component Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            <li>Consistent API design</li>
            <li>Comprehensive prop types</li>
            <li>Theme-aware styling</li>
            <li>Responsive variants</li>
            <li>Animation support</li>
          </ul>
        </div>
      </div>
      <Button className="w-full mt-2">Explore All Components</Button>
    </CardContainer>
  );
}
