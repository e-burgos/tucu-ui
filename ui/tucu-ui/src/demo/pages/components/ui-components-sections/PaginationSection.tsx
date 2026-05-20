import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Pagination,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

import { PropPlayground } from '../../../components/prop-playground';
const PaginationSection: React.FC = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

  return (
    <>
      <HeroCard
        title="Pagination"
        description="A pagination component with page number buttons, ellipsis for large
          ranges, and previous/next navigation."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ArrowLeftRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-8">
            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-3">
                Few Pages
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
              >
                Page {page1} of 5
              </Typography>
              <Pagination
                currentPage={page1}
                totalPages={5}
                onPageChange={setPage1}
              />
            </CardContainer>

            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-3">
                Many Pages (with ellipsis)
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
              >
                Page {page2} of 20
              </Typography>
              <Pagination
                currentPage={page2}
                totalPages={20}
                onPageChange={setPage2}
              />
            </CardContainer>

            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-3">
                Custom Window Size
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
              >
                Page {page3} of 50 (windowSize=3)
              </Typography>
              <Pagination
                currentPage={page3}
                totalPages={50}
                onPageChange={setPage3}
                windowSize={3}
              />
            </CardContainer>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Pagination"
        title="Pagination Playground"
        defaultValues={{
          'currentPage': 1,
          'totalPages': 10,
          'windowSize': 5
}}
        excludeProps={['onPageChange', 'className']}
      >
        {(props) => <Pagination {...props} onPageChange={() => {}} />}
      </PropPlayground>



      <AutoPropsTable componentName="Pagination" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Pagination } from '@e-burgos/tucu-ui';
import { useState } from 'react';

const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>

// With custom window size (more visible page numbers)
<Pagination
  currentPage={currentPage}
  totalPages={50}
  onPageChange={setCurrentPage}
  windowSize={3}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PaginationSection;
