import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider
} from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      mt: 8,
      py: 4,
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth="md">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FitTrack
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" variant="body2" color="text.secondary">
              Privacy
            </Link>
            <Link href="#" variant="body2" color="text.secondary">
              Terms
            </Link>
            <Link href="#" variant="body2" color="text.secondary">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;