import { Button, CardContainer } from 'tucu-ui';

export function Buttons() {
  return (
    <CardContainer className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Button Components</h1>
      <p className="text-base text-gray-600">
        tucu-ui provides versatile button components with support for various
        shapes, sizes, variants, and colors. Buttons include loading states,
        animations, and tooltip support.
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
        <h3 className="font-bold mb-2">Button Features</h3>
        <ul className="list-disc pl-5 text-sm text-gray-500">
          <li>
            <strong>Shapes:</strong> rounded, pill, circle
          </li>
          <li>
            <strong>Variants:</strong> ghost, solid, transparent
          </li>
          <li>
            <strong>Colors:</strong> primary, white, gray, success, info,
            warning, danger
          </li>
          <li>
            <strong>Sizes:</strong> large, medium, small, mini, tiny
          </li>
          <li>
            <strong>States:</strong> loading, disabled, hover, focus
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <Button size="small">Default</Button>
        <Button size="small" variant="ghost">
          Ghost
        </Button>
        <Button size="small" color="success">
          Success
        </Button>
        <Button size="small" color="danger">
          Danger
        </Button>
      </div>
      <Button className="w-full mt-2">See Button Documentation</Button>
    </CardContainer>
  );
}
