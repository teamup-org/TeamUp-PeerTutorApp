import Link from 'next/link';

import AdbIcon from '@mui/icons-material/Adb';
import { Box, Typography } from '@mui/material';

export default function TheoLogo(props: any) {
  return (
    <Box sx={{ flexGrow: props.flexGrow, display: props.display, mr: 2 }}>
      {/*<AdbIcon sx={{ display: props.display, mr: 1 }} />*/}
      <Typography
        variant="h4"
        noWrap
        color="primary"
        fontWeight='bold'
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Theo</Link>
      </Typography>
    </Box>
  );
}