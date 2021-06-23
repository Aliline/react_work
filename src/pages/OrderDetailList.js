import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderDetailListResults from 'src/components/OrderDetail/OrderDetailListResults';
import OrderDetailListToolbar from 'src/components/OrderDetail/OrderDetailListToolbar';
import customers from 'src/__mocks__/customers';

const OrderDetailList = () => (
  <>
    <Helmet>
      <title>OrderList | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <OrderDetailListToolbar />
        <Box sx={{ pt: 3 }}>
          <OrderDetailListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default OrderDetailList;
