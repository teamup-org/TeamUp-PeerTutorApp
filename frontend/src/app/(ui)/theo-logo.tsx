
import Link from 'next/link';

import { Box, Typography } 
  from '@mui/material';


/**
 * Component for the Logo shown on the App Bar
 * @param props - Any props passed to the component. Only listens for and modifies component from 'flexGrow' and 'display' props
 * @returns 
 */  
export default function TheoLogo(props: any) {
  return (
    <Box sx={{ flexGrow: props.flexGrow, display: props.display, mr: 2 }}>
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