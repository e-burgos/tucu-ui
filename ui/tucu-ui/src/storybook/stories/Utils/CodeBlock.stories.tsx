import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CodeBlock } from '../../../components/utils';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof CodeBlock> = {
  title: '3. UI COMPONENTS/Utils/CodeBlock',
  tags: ['autodocs'],
  component: CodeBlock,
  parameters: {
    docs: {
      description: {
        component:
          'A versatile code block component that displays formatted code with syntax highlighting, copy functionality, expand/collapse feature, and language indicator. Perfect for documentation, tutorials, and code examples.',
      },
    },
  },
  argTypes: {
    code: {
      control: 'text',
      description: 'The code content to display',
    },
    language: {
      control: 'text',
      description:
        'Optional language indicator (e.g., "typescript", "javascript", "jsx")',
    },
  },
};

export default meta;

const Template: StoryFn<typeof CodeBlock> = (args) => (
  <StoryContainer>
    <CodeBlock {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  code: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`,
  language: 'typescript',
};

export const WithoutLanguage = Template.bind({});
WithoutLanguage.args = {
  code: `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`,
};

export const ReactComponent = Template.bind({});
ReactComponent.args = {
  code: `import React, { useState } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={\`px-4 py-2 rounded-md transition-colors \${
        isClicked ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
      } text-white font-medium\`}
    >
      {children}
    </button>
  );
};`,
  language: 'tsx',
};

export const JSONData = Template.bind({});
JSONData.args = {
  code: `{
  "name": "tucu-ui",
  "version": "1.0.0",
  "description": "A modern UI component library",
  "main": "index.js",
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "test": "jest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`,
  language: 'json',
};

export const CSSStyles = Template.bind({});
CSSStyles.args = {
  code: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}

.button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.button--primary {
  background-color: #3b82f6;
  color: white;
}

.button--secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.button--danger {
  background-color: #ef4444;
  color: white;
}`,
  language: 'css',
};

export const ShellScript = Template.bind({});
ShellScript.args = {
  code: `#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start the development server
if [ "$1" = "dev" ]; then
  npm run dev
else
  npm run build
  npm start
fi

echo "Setup complete!"`,
  language: 'bash',
};

export const PythonExample = Template.bind({});
PythonExample.args = {
  code: `def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        next_num = sequence[i-1] + sequence[i-2]
        sequence.append(next_num)
    
    return sequence

# Example usage
numbers = fibonacci(10)
print(f"First 10 Fibonacci numbers: {numbers}")

# Calculate sum
total = sum(numbers)
print(f"Sum: {total}")`,
  language: 'python',
};

export const LongCode = Template.bind({});
LongCode.args = {
  code: `import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserSearchProps {
  onUserSelect: (user: User) => void;
  placeholder?: string;
  maxResults?: number;
}

export const UserSearch: React.FC<UserSearchProps> = ({
  onUserSelect,
  placeholder = "Search users...",
  maxResults = 10,
}) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`/api/users/search?q=\${encodeURIComponent(searchQuery)}&limit=\${maxResults}\`);
      
      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [maxResults]);

  const debouncedSearch = useMemo(
    () => debounce(searchUsers, 300),
    [searchUsers]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading && (
            <div className="px-4 py-2 text-gray-500">
              Searching...
            </div>
          )}

          {error && (
            <div className="px-4 py-2 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && query.trim() && (
            <div className="px-4 py-2 text-gray-500">
              No users found
            </div>
          )}

          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              <div className="flex items-center space-x-3">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`,
  language: 'tsx',
};

export const SQLQuery = Template.bind({});
SQLQuery.args = {
  code: `-- User management queries
SELECT 
  u.id,
  u.username,
  u.email,
  u.created_at,
  p.first_name,
  p.last_name,
  p.avatar_url
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
WHERE u.active = true
  AND u.created_at >= '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 50;

-- Update user profile
UPDATE profiles 
SET 
  first_name = 'John',
  last_name = 'Doe',
  updated_at = NOW()
WHERE user_id = 1;

-- Create index for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);`,
  language: 'sql',
};
