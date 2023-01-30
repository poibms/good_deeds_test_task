import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type TabsProps = {
  children: React.ReactNode;
  value: any;
  handleChange: any;
  tab: {label: string}[]
}

export default function BasicTabs({children, value, handleChange, tab}: TabsProps) {
  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {
              tab.map((item) => 
                <Tab label={item.label} />
              )
            }
          </Tabs>
        </Box>
        {children}
      </Box>
  );
}