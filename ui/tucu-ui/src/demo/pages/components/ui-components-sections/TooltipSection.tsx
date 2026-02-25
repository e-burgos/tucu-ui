import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
  Tooltip,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const TooltipSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Tooltip
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A portal-based tooltip component that renders above all other DOM
          elements. Supports configurable placement, arrow, color themes, and
          delays.
        </Typography>
      </div>

      {/* Placement Examples */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Placement" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Tooltip content="Top tooltip" placement="top" arrow>
                <Button variant="ghost" size="small">
                  Top
                </Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom" arrow>
                <Button variant="ghost" size="small">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left" arrow>
                <Button variant="ghost" size="small">
                  Left
                </Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right" arrow>
                <Button variant="ghost" size="small">
                  Right
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Color Themes */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Color Themes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Tooltip content="Auto (uses theme mode)" arrow>
                <Button variant="ghost" size="small">
                  Auto
                </Button>
              </Tooltip>
              <Tooltip content="Dark theme" color="dark" arrow>
                <Button variant="ghost" size="small">
                  Dark
                </Button>
              </Tooltip>
              <Tooltip content="Light theme" color="light" arrow>
                <Button variant="ghost" size="small">
                  Light
                </Button>
              </Tooltip>
              <Tooltip content="Primary color" color="primary" arrow>
                <Button variant="ghost" size="small" color="primary">
                  Primary
                </Button>
              </Tooltip>
              <Tooltip content="Success message" color="success" arrow>
                <Button variant="ghost" size="small" color="success">
                  Success
                </Button>
              </Tooltip>
              <Tooltip content="Info message" color="info" arrow>
                <Button variant="ghost" size="small" color="info">
                  Info
                </Button>
              </Tooltip>
              <Tooltip content="Warning message" color="warning" arrow>
                <Button variant="ghost" size="small" color="warning">
                  Warning
                </Button>
              </Tooltip>
              <Tooltip content="Danger message" color="danger" arrow>
                <Button variant="ghost" size="small" color="danger">
                  Danger
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Arrow Toggle */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Arrow Options" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Tooltip content="With arrow" arrow>
                <Button variant="ghost" size="small" color="info">
                  With Arrow
                </Button>
              </Tooltip>
              <Tooltip content="Without arrow" arrow={false}>
                <Button variant="ghost" size="small" color="info">
                  No Arrow
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Rich Content */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Rich Content" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Tooltip
                content={
                  <div className="space-y-1">
                    <Typography tag="strong" className="text-xs">
                      Rich Tooltip
                    </Typography>
                    <Typography tag="p" className="text-xs opacity-80">
                      Supports any React node as content.
                    </Typography>
                  </div>
                }
                placement="bottom"
                color="light"
                arrow
              >
                <Button variant="ghost" size="small" color="success">
                  Rich Content
                </Button>
              </Tooltip>
              <Tooltip content="Delayed tooltip" enterDelay={500} arrow>
                <Button variant="ghost" size="small" color="warning">
                  500ms Delay
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Integration with other components */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Component Integration" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with tooltip prop
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Button tooltip="Save changes" tooltipPlacement="top">
                    Save
                  </Button>
                  <Button
                    tooltip="Delete item"
                    tooltipPlacement="bottom"
                    tooltipColor="light"
                    color="danger"
                  >
                    Delete
                  </Button>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Typography with tooltip prop
                </Typography>
                <div className="flex flex-wrap gap-4 items-center">
                  <Typography
                    tag="span"
                    tooltip="This is an abbreviation"
                    tooltipPlacement="top"
                    className="underline decoration-dotted cursor-help"
                  >
                    Hover this text
                  </Typography>
                  <Typography
                    tag="strong"
                    tooltip="Important information"
                    tooltipPlacement="right"
                    tooltipColor="light"
                  >
                    Bold with tooltip
                  </Typography>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Tooltip"
        defaultValues={{
          placement: 'top',
          color: 'primary',
          arrow: true,
          disabled: false,
          enterDelay: 0,
          leaveDelay: 100,
        }}
        excludeProps={['children', 'content']}
      >
        {(props) => (
          <Tooltip {...props} content="Tooltip preview text">
            <Button>Hover me</Button>
          </Tooltip>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Tooltip" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Tooltip, Button, Typography } from '@e-burgos/tucu-ui';

// Standalone Tooltip wrapping any element
<Tooltip content="Hello!" placement="top" arrow>
  <Button>Hover me</Button>
</Tooltip>

// Auto color — adapts to current theme (dark in light mode, light in dark mode)
<Tooltip content="Auto color">
  <Button>Auto</Button>
</Tooltip>

// Semantic color variants
<Tooltip content="Primary" color="primary" arrow>
  <Button>Primary</Button>
</Tooltip>
<Tooltip content="Success!" color="success" arrow>
  <Button>Success</Button>
</Tooltip>
<Tooltip content="Warning" color="warning" arrow>
  <Button>Warning</Button>
</Tooltip>
<Tooltip content="Danger!" color="danger" arrow>
  <Button>Danger</Button>
</Tooltip>
<Tooltip content="Info" color="info" arrow>
  <Button>Info</Button>
</Tooltip>

// Without arrow
<Tooltip content="No arrow" arrow={false}>
  <Button>No arrow</Button>
</Tooltip>

// Rich content
<Tooltip
  content={
    <div>
      <strong>Title</strong>
      <p>Description</p>
    </div>
  }
  placement="right"
  color="light"
  arrow
>
  <Button>Rich</Button>
</Tooltip>

// Enter delay
<Tooltip content="Delayed" enterDelay={500} arrow>
  <Button>500ms delay</Button>
</Tooltip>

// Built-in tooltip props on Button (with arrow control)
<Button tooltip="Save" tooltipPlacement="top" tooltipArrow={false}>Save</Button>
<Button tooltip="Delete" tooltipColor="danger">Delete</Button>

// Built-in tooltip props on Typography
<Typography tag="span" tooltip="Info" tooltipPlacement="right" tooltipArrow>
  Hover text
</Typography>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TooltipSection;
