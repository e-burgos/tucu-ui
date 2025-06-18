import { useState } from 'react';
import { SearchIcon } from '../icons/search';
import Avatar from '../common/avatar';

type CollectionList = {
  icon: string;
  name: string;
  value: string;
};

export interface CollectionSelectListTypes {
  collectionList: CollectionList[];
  onSelect: (value: string) => void;
}

export function CollectionSelectList({
  collectionList,
  onSelect,
}: CollectionSelectListTypes) {
  const [searchKeyword, setSearchKeyword] = useState('');
  let coinListData = collectionList;
  if (searchKeyword.length > 0) {
    coinListData = collectionList.filter(function (item) {
      const name = item.name;
      return (
        name.match(searchKeyword) ||
        (name.toLowerCase().match(searchKeyword) && name)
      );
    });
  }
  function handleSelectedCoin(value: string) {
    onSelect(value);
  }
  return (
    <div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-light-dark">
      <div className="relative">
        <SearchIcon className="absolute left-6 h-full text-gray-700 dark:text-white" />
        <input
          type="search"
          autoFocus={true}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search..."
          className="w-full border-t-0 border-r-0 border-l-0 rounded-t-lg border-b border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:focus:border-gray-500"
        />
      </div>
      <ul role="listbox" className="py-3">
        {coinListData.length > 0 ? (
          coinListData.map((item, index) => (
            <li
              key={index}
              tabIndex={index}
              onClick={() => handleSelectedCoin(item.value)}
              className="mb-1 flex cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-600"
            >
              <Avatar image={item.icon} size="xs" alt={item.name} />
              <span className="text-sm tracking-tight text-gray-600 dark:text-white">
                {item.name}
              </span>
            </li>
          ))
        ) : (
          // FIXME: need coin not found svg from designer
          <li className="px-6 py-5 text-center">
            <h3 className="mb-2 text-sm text-gray-600 dark:text-white">
              Ops! not found
            </h3>
          </li>
        )}
      </ul>
    </div>
  );
}

export default CollectionSelectList;
