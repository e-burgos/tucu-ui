import React, { Fragment, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Listbox, Transition } from '../../../components/headlessui';
import { StoryContainer } from '../../components/StoryContainer';
import { Check, ChevronDown } from 'lucide-react';
import {
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

const meta: Meta<typeof Listbox> = {
  title: 'EXTERNAL LIBS/HeadlessUI/Listbox',
  tags: ['autodocs'],
  component: Listbox,
  parameters: {
    docs: {
      description: {
        component:
          'The Listbox component is a dropdown list that allows users to select an option from a list of values. It follows the WAI-ARIA design pattern for a listbox.',
      },
    },
  },
};

export default meta;

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
];

const Template: StoryFn<typeof Listbox> = () => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
              <span className="block text-gray-900 truncate">
                {selected.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
                {people.map((person) => (
                  <ListboxOption
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-indigo-600' : 'text-indigo-600'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});

export const WithImages = () => {
  interface Person {
    id: number;
    name: string;
    avatar: string;
  }

  const people: Person[] = [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Tom Cook',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const [selected, setSelected] = useState<Person>(people[0]);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
              <div className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-6 w-6 shrink-0 rounded-full"
                />
                <span className="ml-3 block text-gray-900 truncate">
                  {selected.name}
                </span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
                {people.map((person) => (
                  <ListboxOption
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={person.avatar}
                            alt=""
                            className="h-6 w-6 shrink-0 rounded-full"
                          />
                          <span
                            className={`ml-3 block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-indigo-600' : 'text-indigo-600'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
    </StoryContainer>
  );
};

export const MultiSelect = () => {
  const [selectedPeople, setSelectedPeople] = useState<typeof people>([]);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-72">
        <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
              <span className="block text-gray-900 truncate">
                {selectedPeople.length === 0
                  ? 'Select people'
                  : `${selectedPeople.length} selected`}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
                {people.map((person) => {
                  const isSelected = selectedPeople.some(
                    (p) => p.id === person.id
                  );
                  return (
                    <ListboxOption
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ active }) => (
                        <>
                          <span
                            className={`block text-gray-900 truncate ${
                              isSelected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {isSelected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-indigo-600' : 'text-indigo-600'
                              }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  );
                })}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Selected:</p>
          <ul className="mt-2 text-sm text-gray-700">
            {selectedPeople.length === 0 ? (
              <li>None</li>
            ) : (
              selectedPeople.map((person) => (
                <li key={person.id}>{person.name}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </StoryContainer>
  );
};

export const CustomStyling = () => {
  const categories = [
    { id: 1, name: 'Electronics', icon: '🔌' },
    { id: 2, name: 'Clothing', icon: '👕' },
    { id: 3, name: 'Books', icon: '📚' },
    { id: 4, name: 'Home & Kitchen', icon: '🏠' },
    { id: 5, name: 'Sports', icon: '⚽' },
  ];

  const [selected, setSelected] = useState(categories[0]);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-full bg-linear-to-r from-blue-500 to-purple-500 py-3 pl-4 pr-10 text-left text-white shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200">
              <span className="flex items-center">
                <span className="mr-2 text-lg">{selected.icon}</span>
                <span className="block truncate font-medium">
                  {selected.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-xl ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                {categories.map((category) => (
                  <ListboxOption
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 ${
                        active
                          ? 'bg-linear-to-r from-blue-50 to-purple-50 text-purple-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className="flex items-center">
                          <span className="mr-2 text-lg">{category.icon}</span>
                          <span
                            className={`block text-gray-900 truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {category.name}
                          </span>
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-purple-600' : 'text-purple-600'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
    </StoryContainer>
  );
};
