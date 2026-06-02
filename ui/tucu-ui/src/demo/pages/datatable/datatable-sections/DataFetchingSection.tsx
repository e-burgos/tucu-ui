/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import {
  DataTable,
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  TanstackTable,
} from '../../../../index';

interface SWCharacter {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
}

// Local fallback data in case SWAPI is down or slow
const fallbackCharacters: SWCharacter[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    birth_year: '19BBY',
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    gender: 'n/a',
    birth_year: '112BBY',
  },
  {
    name: 'R2-D2',
    height: '96',
    mass: '32',
    gender: 'n/a',
    birth_year: '33BBY',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    gender: 'male',
    birth_year: '41.9BBY',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    gender: 'female',
    birth_year: '19BBY',
  },
  {
    name: 'Owen Lars',
    height: '178',
    mass: '120',
    gender: 'male',
    birth_year: '52BBY',
  },
  {
    name: 'Beru Whitesun lars',
    height: '165',
    mass: '75',
    gender: 'female',
    birth_year: '47BBY',
  },
  {
    name: 'R5-D4',
    height: '97',
    mass: '32',
    gender: 'n/a',
    birth_year: 'unknown',
  },
  {
    name: 'Biggs Darklighter',
    height: '183',
    mass: '84',
    gender: 'male',
    birth_year: '24BBY',
  },
  {
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    gender: 'male',
    birth_year: '57BBY',
  },
  {
    name: 'Anakin Skywalker',
    height: '188',
    mass: '84',
    gender: 'male',
    birth_year: '41.9BBY',
  },
  {
    name: 'Wilhuff Tarkin',
    height: '180',
    mass: 'unknown',
    gender: 'male',
    birth_year: '64BBY',
  },
  {
    name: 'Chewbacca',
    height: '228',
    mass: '112',
    gender: 'male',
    birth_year: '200BBY',
  },
  {
    name: 'Han Solo',
    height: '180',
    mass: '80',
    gender: 'male',
    birth_year: '29BBY',
  },
  {
    name: 'Greedo',
    height: '173',
    mass: '74',
    gender: 'male',
    birth_year: '44BBY',
  },
];

const DataFetchingSection: React.FC = () => {
  const [mode, setMode] = useState<'server' | 'client'>('server');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<SWCharacter[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [apiCalls, setApiCalls] = useState<number>(0);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const isInitialLoadRef = useRef(true);

  // Pagination states for server mode
  const [serverPagination, setServerPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: TanstackTable.ColumnDef<SWCharacter, any>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Character Name',
      cell: (info) => (
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      id: 'height',
      accessorKey: 'height',
      header: 'Height (cm)',
    },
    {
      id: 'mass',
      accessorKey: 'mass',
      header: 'Mass (kg)',
    },
    {
      id: 'gender',
      accessorKey: 'gender',
      header: 'Gender',
      cell: (info) => {
        const val = String(info.getValue());
        const color =
          val === 'male' ? 'info' : val === 'female' ? 'danger' : 'gray';
        return (
          <Badge variant="soft" color={color as any}>
            {val}
          </Badge>
        );
      },
    },
    {
      id: 'birth_year',
      accessorKey: 'birth_year',
      header: 'Birth Year',
    },
  ];

  // Fetch handler
  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (isInitialLoadRef.current) {
        setIsLoading(true);
        isInitialLoadRef.current = false;
      } else {
        setIsFetching(true);
      }
      setUsingFallback(false);

      if (mode === 'server') {
        const startItemIndex =
          serverPagination.pageIndex * serverPagination.pageSize;
        const swapiPage = Math.floor(startItemIndex / 10) + 1;
        try {
          setApiCalls((prev) => prev + 1);
          const response = await fetch(
            `https://swapi.py4e.com/api/people/?page=${swapiPage}`
          );
          if (!response.ok) throw new Error('API down');
          const resJson = await response.json();

          if (active) {
            const startIndexOnPage = startItemIndex % 10;
            let results = resJson.results.slice(
              startIndexOnPage,
              startIndexOnPage + serverPagination.pageSize
            );

            // If we need more items than are available on this SWAPI page (e.g. pageSize is 20 or spans pages),
            // fetch the next page and slice the remainder:
            if (results.length < serverPagination.pageSize && resJson.next) {
              const nextResponse = await fetch(
                `https://swapi.py4e.com/api/people/?page=${swapiPage + 1}`
              );
              if (nextResponse.ok) {
                const nextJson = await nextResponse.json();
                const neededCount = serverPagination.pageSize - results.length;
                results = [
                  ...results,
                  ...nextJson.results.slice(0, neededCount),
                ];
              }
            }

            setData(results);
            setTotalCount(resJson.count);
          }
        } catch (err) {
          console.warn('SWAPI failed, using local fallback data', err);
          if (active) {
            setUsingFallback(true);
            // Simulate server page slicing on local fallback
            const start =
              serverPagination.pageIndex * serverPagination.pageSize;
            const end = start + serverPagination.pageSize;
            setData(fallbackCharacters.slice(start, end));
            setTotalCount(fallbackCharacters.length);
          }
        } finally {
          if (active) {
            setIsLoading(false);
            setIsFetching(false);
          }
        }
      } else {
        // Fetch multiple pages sequentially to simulate a larger client dataset
        try {
          setApiCalls((prev) => prev + 1);
          // Fetch pages 1 and 2 (20 characters)
          const [res1, res2] = await Promise.all([
            fetch('https://swapi.py4e.com/api/people/?page=1'),
            fetch('https://swapi.py4e.com/api/people/?page=2'),
          ]);

          if (!res1.ok || !res2.ok) throw new Error('API down');
          const [json1, json2] = await Promise.all([res1.json(), res2.json()]);

          if (active) {
            const combined = [...json1.results, ...json2.results];
            setData(combined);
            setTotalCount(combined.length);
          }
        } catch (err) {
          console.warn('SWAPI failed, using local fallback data', err);
          if (active) {
            setUsingFallback(true);
            setData(fallbackCharacters);
            setTotalCount(fallbackCharacters.length);
          }
        } finally {
          if (active) {
            setIsLoading(false);
            setIsFetching(false);
          }
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [mode, serverPagination.pageIndex, serverPagination.pageSize]);

  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Data Fetching & Pagination"
        description="See how the DataTable handles remote data fetching. Toggle between Server-side pagination (on-demand API requests) and Client-side pagination (single-fetch local processing)."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      {/* ─── Mode Selector & Metrics ──────────────────────────────── */}
      <CardContainer className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Typography
              tag="h4"
              className="font-bold text-gray-900 dark:text-gray-100"
            >
              Interactive Demo Settings
            </Typography>
            <Typography className="text-sm text-foreground/60 mt-1">
              Select how you want to paginate and display the Star Wars
              character dataset.
            </Typography>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl border border-border/40">
            <button
              onClick={() => {
                setMode('server');
                setData([]);
                isInitialLoadRef.current = true;
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'server'
                  ? 'bg-white dark:bg-gray-700 shadow-xs text-brand'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Server-Side Pagination
            </button>
            <button
              onClick={() => {
                setMode('client');
                setData([]);
                isInitialLoadRef.current = true;
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'client'
                  ? 'bg-white dark:bg-gray-700 shadow-xs text-brand'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Client-Side Pagination
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-border/60">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Active Mode
            </span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              {mode === 'server' ? 'Server-Side' : 'Client-Side'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              API Requests (CORS)
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {apiCalls} calls
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Source Status
            </span>
            <span className="text-sm font-semibold mt-1">
              {usingFallback ? (
                <Badge variant="soft" color="warning">
                  Offline Fallback (Local Mock)
                </Badge>
              ) : (
                <Badge variant="soft" color="success">
                  Connected to SWAPI API
                </Badge>
              )}
            </span>
          </div>
        </div>
      </CardContainer>

      {/* ─── DataTable Demo ────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <DataTable
          key={`sw-${mode}-table`}
          tableId={`sw-${mode}-table`}
          columns={columns}
          data={data}
          title={
            mode === 'server'
              ? 'Star Wars Directory (Server Paginated)'
              : 'Star Wars Directory (Client Paginated)'
          }
          isLoading={isLoading}
          isFetching={isFetching}
          border={true}
          pagination={
            mode === 'server'
              ? {
                  showPagination: true,
                  serverPagination: {
                    totalCount: totalCount,
                    pagination: serverPagination,
                    setPagination: (p) => setServerPagination(p),
                  },
                }
              : {
                  showPagination: true,
                  pageSize: 5,
                }
          }
        />
      </CardContainer>

      {/* ─── Comparison Analysis ─────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardContainer className="p-6">
          <CardTitle title="Server-Side Pagination" className="mb-4">
            <Typography className="text-sm text-foreground/75 mb-3">
              In Server-side mode, the table configuration state is mapped to
              backend API parameters. Clicking pages, ordering headers, or
              filtering content triggers a callback to make a new query.
            </Typography>
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">Ideal for:</span>
                <span>Millions of records, heavy datasets</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">First Load:</span>
                <span className="text-emerald-600 font-semibold">
                  Fast (queries only 10 rows)
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">
                  Page Navigation:
                </span>
                <span className="text-amber-600 font-semibold">
                  Requires Fetch (network latency)
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-500">
                  Server Overhead:
                </span>
                <span>High (multiple database hits)</span>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="p-6">
          <CardTitle title="Client-Side Pagination" className="mb-4">
            <Typography className="text-sm text-foreground/75 mb-3">
              In Client-side mode, all records are fetched from the API during
              the initial mount. Once loaded in memory, the local TanStack table
              instance handles pages slicing, sorting, and filter queries
              instantly.
            </Typography>
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">Ideal for:</span>
                <span>Small/medium datasets (&lt; 10,000 rows)</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">First Load:</span>
                <span className="text-amber-600 font-semibold">
                  Slower (downloads all data once)
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-gray-500">
                  Page Navigation:
                </span>
                <span className="text-emerald-600 font-semibold">
                  Instant (handled locally in RAM)
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-500">
                  Server Overhead:
                </span>
                <span>Low (one single HTTP query)</span>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* ─── Code Implementation Comparison ──────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Implementation Code Comparison" className="mb-4">
          <Typography className="text-sm text-foreground/60 mb-6">
            Compare the configuration options between server-side and
            client-side setup.
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Typography tag="h6" className="font-bold text-indigo-500 mb-2">
                Server-Side Configuration
              </Typography>
              <CodeBlock
                language="tsx"
                code={`// Server-Side: Fetch page-by-page
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
});

useEffect(() => {
  fetchData(pagination.pageIndex);
}, [pagination.pageIndex]);

return (
  <DataTable
    tableId="server-table"
    columns={columns}
    data={serverData}
    isLoading={isLoading}
    isFetching={isFetching}
    pagination={{
      showPagination: true,
      serverPagination: {
        totalCount: totalRowsCount,
        pagination: pagination,
        setPagination: (p) => setPagination(p),
      },
    }}
  />
);`}
              />
            </div>

            <div>
              <Typography tag="h6" className="font-bold text-emerald-500 mb-2">
                Client-Side Configuration
              </Typography>
              <CodeBlock
                language="tsx"
                code={`// Client-Side: Fetch all once
useEffect(() => {
  fetchAllData(); // sets clientData once
}, []);

return (
  <DataTable
    tableId="client-table"
    columns={columns}
    data={clientData} // Array of all items
    isLoading={isLoading}
    isFetching={isFetching}
    pagination={{
      showPagination: true,
      pageSize: 10, // Slices locally
    }}
  />
);`}
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ─── React Query Code Comparison ──────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="React Query Code Comparison" className="mb-4">
          <Typography className="text-sm text-foreground/60 mb-6">
            The same two fetching strategies implemented with{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-brand">
              @tanstack/react-query
            </code>
            . React Query handles caching, background re-fetching, loading and
            error states automatically — removing the need for manual{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">
              useEffect
            </code>{' '}
            boilerplate.
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Server-Side with React Query */}
            <div>
              <Typography tag="h6" className="font-bold text-indigo-500 mb-2">
                Server-Side with React Query
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DataTable } from '@e-burgos/tucu-ui';

// Fetch function (one page at a time)
async function fetchPage(pageIndex: number, pageSize: number) {
  const swapiPage = Math.floor((pageIndex * pageSize) / 10) + 1;
  const res = await fetch(
    \`https://swapi.py4e.com/api/people/?page=\${swapiPage}\`
  );
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json(); // { count, results }
}

export function ServerSideTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // useQuery re-runs automatically when pagination changes
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['swapi-server', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchPage(pagination.pageIndex, pagination.pageSize),
    placeholderData: (prev) => prev, // keeps old rows while fetching next
  });

  return (
    <DataTable
      tableId="server-table"
      columns={columns}
      data={data?.results ?? []}
      isLoading={isLoading}
      isFetching={isFetching}
      pagination={{
        showPagination: true,
        serverPagination: {
          totalCount: data?.count ?? 0,
          pagination,
          setPagination: (p) => setPagination(p),
        },
      }}
    />
  );
}`}
              />
            </div>

            {/* Client-Side with React Query */}
            <div>
              <Typography tag="h6" className="font-bold text-emerald-500 mb-2">
                Client-Side with React Query
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@e-burgos/tucu-ui';

// Fetch function — loads all data once
async function fetchAllCharacters() {
  const [res1, res2] = await Promise.all([
    fetch('https://swapi.py4e.com/api/people/?page=1'),
    fetch('https://swapi.py4e.com/api/people/?page=2'),
  ]);
  if (!res1.ok || !res2.ok)
    throw new Error('Network response was not ok');
  const [json1, json2] = await Promise.all([
    res1.json(),
    res2.json(),
  ]);
  return [...json1.results, ...json2.results]; // full local array
}

export function ClientSideTable() {
  // Single fetch → result is cached by React Query automatically
  const { data = [], isLoading, isFetching } = useQuery({
    queryKey: ['swapi-client-all'],
    queryFn: fetchAllCharacters,
    staleTime: 5 * 60 * 1000, // keep fresh for 5 minutes
  });

  return (
    <DataTable
      tableId="client-table"
      columns={columns}
      data={data} // full array — DataTable slices locally
      isLoading={isLoading}
      isFetching={isFetching}
      pagination={{
        showPagination: true,
        pageSize: 10, // client-side slicing, no extra fetches
      }}
    />
  );
}`}
              />
            </div>
          </div>

          {/* Key differences callout */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                queryKey
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Server-side includes{' '}
                <code className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
                  pageIndex
                </code>{' '}
                &amp;{' '}
                <code className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
                  pageSize
                </code>{' '}
                in the key so each page is cached independently.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                placeholderData
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Using{' '}
                <code className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
                  placeholderData: (prev) =&gt; prev
                </code>{' '}
                keeps the previous page visible while the next one loads —
                equivalent to <em>keepPreviousData</em> in v4.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                staleTime
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Client-side uses{' '}
                <code className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
                  staleTime
                </code>{' '}
                to avoid re-fetching the full dataset on every window focus or
                component re-mount.
              </p>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default DataFetchingSection;
