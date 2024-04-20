import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MyDrawer } from '@/components/list/Drawer';

export default function TemporaryDrawer({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MyDrawer />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Scheduler
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </div>
  );
}