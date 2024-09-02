import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ContextDataTable from './components/TableExamples/ContextDataTable';
import EmptyStateDataTable from './components/TableExamples/EmptyStateDataTable';
import ErrorStateDataTable from './components/TableExamples/ErrorStateDataTable';
import LoadingStateDataTable from './components/TableExamples/LoadingStateDataTable';
import SimpleDataTable from './components/TableExamples/SimpleDataTable';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { storage } from '../local-storage';
import useTableColors from '../hooks/useTableColors';
import FormControlLabel from '@mui/material/FormControlLabel';

const DataTablePage: React.FC = () => {
  const { colors } = useTableColors();
  const [darkMode, setDarkMode] = React.useState(true);
  const currentTheme = storage.get('settings');
  const themeMode = currentTheme?.themeMode;

  React.useEffect(() => {
    if (!themeMode) {
      storage.set('settings', { themeMode: 'dark' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box',
          height: '80',
          backgroundColor: colors.paperBg,
          position: 'sticky',
          borderBottom: `1px solid ${colors.divider}`,
        }}
      >
        <Typography sx={{ color: colors.primaryText }} variant="h5">
          TucuTable Demo
        </Typography>

        <FormControlLabel
          sx={{ color: colors.primaryText }}
          label="Switch Theme"
          control={
            <Switch
              value={darkMode}
              checked={themeMode === 'dark'}
              onChange={() => {
                const themeMode = darkMode ? 'light' : 'dark';
                storage.set('settings', { themeMode: themeMode });
                setDarkMode(!darkMode);
              }}
            />
          }
        />
      </Box>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 50px',
          backgroundColor: !darkMode ? '#F5F5F5' : '#121212',
        }}
      >
        <Box sx={{ height: '20px' }} />
        <Typography sx={{ color: colors.primaryText }} variant="h4">
          Context DataTable Example
        </Typography>
        <ContextDataTable />
        <Box sx={{ height: '40px' }} />
        <Box sx={{ border: `1px solid ${colors.divider}` }} />
        <Box sx={{ height: '20px' }} />

        <SimpleDataTable />
        <Box sx={{ height: '20px' }} />

        <ErrorStateDataTable />
        <Box sx={{ height: '20px' }} />

        <EmptyStateDataTable />
        <Box sx={{ height: '20px' }} />

        <LoadingStateDataTable />
        <Box sx={{ height: '20px' }} />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box',
          height: '80',
          backgroundColor: colors.paperBg,
          position: 'sticky',
          bottom: 0,
          borderTop: `1px solid ${colors.divider}`,
        }}
      >
        <a
          href="https://www.estebanburgos.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: colors.primaryText }}
        >
          <Typography sx={{ color: colors.primaryText }} variant="body2">
            {`© ${new Date().getFullYear()} - Powered by Esteban Burgos`}
          </Typography>
        </a>
      </Box>
    </>
  );
};

export default DataTablePage;
