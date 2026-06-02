import React from 'react';
import { Spinner } from '../../Common/Spinner';
import { IDataTableStateMessage } from '../../../common/types';
import { cn } from '../../../common/helpers/cn';

/**
 * Props for the StateTableHandler component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {number} containerWith - The width of the container.
 * @property {boolean} isLoading - Whether the data is loading.
 * @property {boolean} isEmpty - Whether the data is empty.
 * @property {boolean} isError - Whether the data is in an error state.
 * @property {IDataTableStateMessage} stateMessage - The state message to display.
 */

interface StateTableHandlerProps {
  containerWith: number;
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  stateMessage?: IDataTableStateMessage;
}

const StateTableHandler: React.FC<StateTableHandlerProps> = ({
  containerWith,
  isLoading,
  isEmpty,
  isError,
  stateMessage = { hideContactSupport: false },
}) => {
  const defaultText = {
    noData: stateMessage?.noData || 'No available data',
    noDataDescription:
      stateMessage?.noDataDescription ||
      'There is no data based on the selected criteria. Please try adjusting your filters or refreshing the page to ensure any recent changes are reflected.',
    errorData:
      stateMessage?.errorData || 'There was a problem loading the data',
    errorDataDescription:
      stateMessage?.errorDataDescription ||
      'Please try again refreshing the page or the selected content. If the problem continues or you need help, contact our Support Team.',
    contactSupport: stateMessage?.contactSupport || 'Contact Support',
    contactSupportLink:
      stateMessage?.contactSupportLink || 'https://www.estebanburgos.com.ar/',
  };

  return (
    <div
      role="rowgroup"
      className={cn(
        'h-[200px]! relative flex items-center',
        stateMessage?.className
      )}
    >
      <div
        role="row"
        className="sticky left-0 transition-transform duration-200 [transition-behavior:smooth]"
        style={{
          width: containerWith,
        }}
      >
        <div
          role="cell"
          className="font-normal flex flex-row justify-center items-center w-full h-full! max-h-max! min-h-fit! px-4 box-border z-0"
        >
          {isLoading && (
            <div className="flex flex-col justify-center items-center w-full max-w-[420px] h-full min-h-[200px] box-border z-0 gap-4 p-4">
              <Spinner size="lg" color="primary" />
            </div>
          )}
          {isEmpty && !isError && !isLoading && (
            <div className="flex flex-col justify-center items-center w-full max-w-[420px] h-full min-h-[200px] box-border z-0 gap-4 p-4">
              <h6 className="text-lg font-bold leading-6 text-center m-0 p-0 text-table-primary-text">
                {defaultText.noData}
              </h6>
              <p className="font-sans text-sm font-normal leading-5 text-center tracking-[0.15px] m-0 p-0 text-table-secondary-text">
                {defaultText.noDataDescription}
              </p>
              {!stateMessage?.hideContactSupport &&
                stateMessage?.contactSupportLink && (
                  <button
                    className="flex justify-center items-center w-fit h-fit min-h-[30px] border-none text-[var(--color-table-primary)] bg-transparent font-sans text-sm font-medium leading-5 tracking-[0.15px] text-center cursor-pointer z-0 hover:opacity-80 transition-opacity"
                    onClick={() =>
                      window.open(defaultText.contactSupportLink, 'blank')
                    }
                  >
                    {'Contact Support'}
                  </button>
                )}
            </div>
          )}
          {isError && !isLoading && (
            <div className="flex flex-col justify-center items-center w-full max-w-[420px] h-full min-h-[200px] box-border z-0 gap-4 p-4">
              <h6 className="font-sans text-lg font-bold leading-6 text-center m-0 p-0 text-table-primary-text">
                {defaultText.errorData}
              </h6>
              <p className="font-sans text-sm font-normal leading-5 text-center tracking-[0.15px] m-0 p-0 text-table-secondary-text">
                {defaultText.errorDataDescription}
              </p>
              {!stateMessage?.hideContactSupport && (
                <button
                  className="flex justify-center items-center w-fit h-fit min-h-[30px] border-none text-[var(--color-table-primary)] bg-transparent font-sans text-sm font-medium leading-5 tracking-[0.15px] text-center cursor-pointer z-0 hover:opacity-80 transition-opacity"
                  onClick={() =>
                    window.open(defaultText.contactSupportLink, 'blank')
                  }
                >
                  {'Contact Support'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateTableHandler;
