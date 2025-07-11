import { Button, CardContainer } from 'tucu-ui';

export function Forms() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Form Components</h1>
      <p className="text-base text-gray-600">
        Build robust forms with tucu-ui's comprehensive form components.
        Includes inputs, checkboxes, radio buttons, switches, selects, and more,
        all with built-in validation support via react-hook-form.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Form Components</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Input:</strong> Text, password, search fields
          </li>
          <li>
            <strong>Selection:</strong> Checkbox, radio, switch, select
          </li>
          <li>
            <strong>Complex:</strong> File upload, pin code, textarea
          </li>
          <li>
            <strong>Containers:</strong> Form, field container, labels
          </li>
          <li>
            <strong>Validation:</strong> Error messages, helper text
          </li>
        </ul>
      </div>
      <Button className="w-full mt-2">See Form Documentation</Button>
    </CardContainer>
  );
}
