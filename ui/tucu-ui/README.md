# Tucu UI

A React UI component library with Tailwind CSS.

## Usage

### Install

```bash
npm install tucu-ui
```

### Importing components

```tsx
import { Button, Card } from 'tucu-ui';
import 'tucu-ui/styles'; // Import CSS styles

function App() {
  return (
    <div>
      <Card>
        <h2>Card title</h2>
        <p>Card content</p>
        <Button>Click me</Button>
      </Card>
    </div>
  );
}
```

### Importing styles

Tailwind CSS styles are included in the package. Simply import the styles in your main styles.css file:

```css
@import 'tucu-ui/styles';
```

## Tailwind CSS Configuration

If you're using Tailwind CSS in your project, make sure to configure your `tailwind.config.js` to include tucu-ui components:

```js
module.exports = {
  content: [
    // ... your paths
    './node_modules/tucu-ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your configuration
};
```

## License

MIT
