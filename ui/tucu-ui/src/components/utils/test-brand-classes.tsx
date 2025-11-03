import React, { useState } from 'react';
import Button from '../buttons';

export function TestBrandClasses() {
  const [showTestBrandClasses, setShowTestBrandClasses] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="small"
        onClick={() => {
          setShowTestBrandClasses(!showTestBrandClasses);
        }}
      >
        Test Brand Classes
      </Button>
      {showTestBrandClasses && (
        <div className="fixed top-[100px]  right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Test Brand Classes & All Utilities
          </h3>

          <div className="flex flex-col gap-2 overflow-y-auto h-80">
            {/* Test arbitrary values */}
            <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Arbitrary Values:
              </h4>
              <div className="space-y-1 text-xs">
                <div className="w-[200px] h-[11px] bg-blue-500 rounded">
                  w-[200px] (arbitrary width)
                </div>

                <div className="text-[18px] text-green-600">
                  text-[18px] (arbitrary font size)
                </div>
              </div>
            </div>

            {/* Test grid utilities */}
            <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Grid Utilities:
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-purple-200 p-1 rounded">col-1</div>
                <div className="bg-purple-300 p-1 rounded">col-2</div>
                <div className="bg-purple-400 p-1 rounded">col-3</div>
              </div>
            </div>

            {/* Test background utilities */}
            <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Background Utilities:
              </h4>
              <div className="flex gap-2 text-xs">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded"></div>
                <div className="w-6 h-6 bg-repeat bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><circle cx=%2210%22 cy=%2210%22 r=%222%22 fill=%22%236b7280%22/></svg>')] rounded"></div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Background colors */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  bg-brand (100%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand/80 rounded border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  bg-brand/80 (80%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand/50 rounded border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  bg-brand/50 (50%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand/20 rounded border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  bg-brand/20 (20%)
                </span>
              </div>

              {/* Text colors */}
              <div className="flex items-center gap-2">
                <span className="text-brand font-semibold">text-brand</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-brand/80">text-brand/80</span>
              </div>

              {/* Border colors */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-brand rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  border-brand
                </span>
              </div>

              {/* Hover effects */}
              <button className="px-3 py-1 bg-brand hover:bg-brand/80 text-white rounded transition-colors">
                hover:bg-brand/80
              </button>

              {/* Ring colors */}
              <button className="px-3 py-1 bg-white dark:bg-gray-700 border border-brand text-brand hover:bg-brand hover:text-white rounded transition-colors focus:ring-2 focus:ring-brand/50">
                focus:ring-brand/50
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Current brand color:{' '}
                <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                  var(--color-brand)
                </code>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
