import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../../../components/typography';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Typography> = {
  title: '3. UI COMPONENTS/Data Display/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The Typography component is used to render text and paragraphs within an interface using well-defined typographic styles. It renders a `<p>` tag by default but can be customized to use different HTML tags.',
      },
    },
  },
  argTypes: {
    tag: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'i',
        'b',
        'q',
        'em',
        'strong',
        'small',
        'span',
        'del',
        'mark',
        'abbr',
        'pre',
        'code',
        'kbd',
        'blockquote',
        'sub',
        'sup',
      ],
      description: 'The HTML tag to render',
    },
    title: {
      control: 'text',
      description: 'Title attribute (only appears when tag is abbr)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for extra styling',
    },
    children: {
      control: 'text',
      description: 'The content to display',
    },
  },
  args: {
    tag: 'p',
    children: 'This is a paragraph text using the Typography component.',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer>
      <Typography {...args} />
    </StoryContainer>
  ),
};

export const Headings: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-8">
        <div>
          <Typography tag="h1" className="mb-3">
            Heading 1 - Main Title
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-4xl, font-bold, leading-tight, tracking-tight - Used for page
            titles and main headings
          </Typography>
        </div>

        <div>
          <Typography tag="h2" className="mb-3">
            Heading 2 - Section Title
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-3xl, font-bold, leading-tight, tracking-tight - Used for major
            section headings
          </Typography>
        </div>

        <div>
          <Typography tag="h3" className="mb-3">
            Heading 3 - Subsection Title
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-2xl, font-semibold, leading-snug, tracking-normal - Used for
            subsection headings
          </Typography>
        </div>

        <div>
          <Typography tag="h4" className="mb-3">
            Heading 4 - Minor Title
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-xl, font-semibold, leading-snug, tracking-normal - Used for
            minor headings and card titles
          </Typography>
        </div>

        <div>
          <Typography tag="h5" className="mb-3">
            Heading 5 - Small Title
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-lg, font-medium, leading-normal, tracking-normal - Used for
            small headings and labels
          </Typography>
        </div>

        <div>
          <Typography tag="h6" className="mb-3">
            Heading 6 - Caption
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400 text-sm">
            text-base, font-medium, leading-normal, tracking-wide, uppercase -
            Used for captions and small labels
          </Typography>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const TextFormatting: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-4 max-w-2xl">
        <Typography tag="p">
          This is a regular paragraph with{' '}
          <Typography tag="strong">strong text</Typography>,{' '}
          <Typography tag="em">emphasized text</Typography>, and{' '}
          <Typography tag="b">bold text</Typography>.
        </Typography>

        <Typography tag="p">
          You can also use <Typography tag="i">italic text</Typography>,{' '}
          <Typography tag="small">small text</Typography>, and{' '}
          <Typography tag="mark">highlighted text</Typography>.
        </Typography>

        <Typography tag="p">
          For deletions use <Typography tag="del">deleted text</Typography> and
          for <Typography tag="sub">subscript</Typography> or{' '}
          <Typography tag="sup">superscript</Typography> text.
        </Typography>
      </div>
    </StoryContainer>
  ),
};

export const CodeAndKeyboard: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-4 max-w-2xl">
        <Typography tag="p">
          <Typography tag="code">
            Use the console.log() function to debug your code.
          </Typography>
        </Typography>

        <Typography tag="p">
          Press <Typography tag="kbd">Ctrl</Typography> +{' '}
          <Typography tag="kbd">C</Typography> to copy and{' '}
          <Typography tag="kbd">Ctrl</Typography> +{' '}
          <Typography tag="kbd">V</Typography> to paste.
        </Typography>

        <Typography tag="pre">
          {`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
        </Typography>
      </div>
    </StoryContainer>
  ),
};
export const Code: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-4 max-w-2xl">
        <Typography tag="p">This is a code block example</Typography>

        <Typography tag="code">
          {`
typography: theme => ({
  default: {
    css: {
      pre: {
        color: theme("colors.grey.1000"),
        backgroundColor: theme("colors.grey.100")
      },
      "pre code::before": {
        "padding-left": "unset"
      },
      "pre code::after": {
        "padding-right": "unset"
      },
      code: {
        backgroundColor: theme("colors.grey.100"),
        color: "#DD1144",
        fontWeight: "400",
        "border-radius": "0.25rem"
      },
      "code::before": {
        content: '""',
        "padding-left": "0.25rem"
      },
      "code::after": {
        content: '""',
        "padding-right": "0.25rem"
      }
    }
  }
})
         `}
        </Typography>
      </div>
    </StoryContainer>
  ),
};

export const Quotes: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-6 max-w-2xl">
        <Typography tag="blockquote">
          "The best way to predict the future is to invent it." - Alan Kay
        </Typography>

        <Typography tag="p">
          As Steve Jobs once said,{' '}
          <Typography tag="q">
            Innovation distinguishes between a leader and a follower.
          </Typography>
        </Typography>
      </div>
    </StoryContainer>
  ),
};

export const AbbreviationsAndAcronyms: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-4 max-w-2xl">
        <Typography tag="p">
          The{' '}
          <Typography tag="abbr" title="HyperText Markup Language">
            HTML
          </Typography>{' '}
          standard is maintained by the{' '}
          <Typography tag="abbr" title="World Wide Web Consortium">
            W3C
          </Typography>
          .
        </Typography>

        <Typography tag="p">
          Modern web development often uses{' '}
          <Typography tag="abbr" title="Application Programming Interface">
            API
          </Typography>
          s and{' '}
          <Typography tag="abbr" title="Software Development Kit">
            SDK
          </Typography>
          s to build applications.
        </Typography>
      </div>
    </StoryContainer>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-4">
        <Typography
          tag="h2"
          className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-200 pb-2"
        >
          Custom Styled Heading
        </Typography>

        <Typography
          tag="p"
          className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg"
        >
          This paragraph has custom styling with background color and border.
        </Typography>

        <Typography tag="code" className=" text-green-400">
          npm install tucu-ui
        </Typography>
      </div>
    </StoryContainer>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <StoryContainer className="justify-start">
      <article className="max-w-3xl space-y-6">
        <header className="space-y-2">
          <Typography tag="h1">Getting Started with Tucu UI</Typography>
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            A comprehensive guide to building beautiful interfaces
          </Typography>
        </header>

        <Typography tag="h2">Introduction</Typography>
        <Typography tag="p">
          Tucu UI is a modern React component library that provides a
          comprehensive set of components for building beautiful and responsive
          user interfaces. Built with{' '}
          <Typography tag="strong">TypeScript</Typography> and{' '}
          <Typography tag="strong">Tailwind CSS</Typography>, it offers
          excellent developer experience and customization options.
        </Typography>

        <Typography tag="h3">Installation</Typography>
        <Typography tag="p">
          To get started, install the package using{' '}
          <Typography tag="abbr" title="Node Package Manager">
            npm
          </Typography>
          :
        </Typography>

        <Typography tag="pre">npm install tucu-ui</Typography>

        <Typography tag="h3">Basic Usage</Typography>
        <Typography tag="p">
          Import the components you need and start building:
        </Typography>

        <Typography tag="pre">
          {`import { Button, Typography } from 'tucu-ui';

function App() {
  return (
    <div>
      <Typography tag="h1">Welcome!</Typography>
      <Button>Get Started</Button>
    </div>
  );
}`}
        </Typography>

        <Typography tag="blockquote">
          "Simplicity is the ultimate sophistication." - Leonardo da Vinci
        </Typography>

        <Typography tag="h2">Key Features</Typography>
        <Typography tag="p">
          The library includes{' '}
          <Typography tag="mark">over 50 components</Typography> covering
          everything from basic UI elements to complex data visualization tools.
          All components are fully accessible and support both light and dark
          themes.
        </Typography>

        <Typography tag="p">
          <Typography tag="small">
            Last updated: December 2024 | Version 1.0.0
          </Typography>
        </Typography>
      </article>
    </StoryContainer>
  ),
};

export const InteractiveContent: Story = {
  render: () => (
    <StoryContainer>
      <div className="space-y-6 max-w-2xl">
        <Typography tag="h2">Interactive Typography Examples</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography tag="h4" className="mb-2">
              Code Snippet
            </Typography>
            <Typography tag="code" className="block">
              const message = "Hello World";
            </Typography>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography tag="h4" className="mb-2">
              Keyboard Shortcuts
            </Typography>
            <Typography tag="p">
              <Typography tag="kbd">⌘</Typography> +{' '}
              <Typography tag="kbd">K</Typography>
            </Typography>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography tag="h4" className="mb-2">
              Mathematical Expression
            </Typography>
            <Typography tag="p">
              E = mc<Typography tag="sup">2</Typography>
            </Typography>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography tag="h4" className="mb-2">
              Chemical Formula
            </Typography>
            <Typography tag="p">
              H<Typography tag="sub">2</Typography>O
            </Typography>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
