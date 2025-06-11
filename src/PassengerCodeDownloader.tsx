import { useCallback, useState } from 'react';
import { Close, FileDownloadOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import { Passenger } from './types/Passengers';
import downloadElementAsImage from './utils/downloadElementAsImage';
import SvgRenderer from './components/SvgRenderer';

type Props = {
  handleClose: () => void;
  passengerData: Passenger;
};

const TEXT_STYLES = {
  textRendering: 'geometricPrecision',
  fontSmooth: 'always',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  fontSize: '1rem',
  lineHeight: 1.5,
};

export default function PassengerCodeDownloader({
  handleClose,
  passengerData,
}: Props) {
  const [downloadClickCount, setDownloadClickCount] = useState(0);

  let title = passengerData?.id_company;

  if (passengerData?.name) title = `${passengerData?.name}`;
  if (passengerData?.last_name) title = `${title} ${passengerData?.last_name}`;

  const value = passengerData?.encryptedData;
  const disableDownload = !value;

  const passengerInformation = [
    {
      label: 'passenger',
      value: title,
    },
    {
      label: 'employee_number',
      value: passengerData?.id_company,
    },
  ];

  const downloadPassengerCode = useCallback(() => {
    const svgElement = document.getElementById('passengerCode') as HTMLElement;

    if (svgElement) {
      const originalPadding = svgElement.style.padding;
      const originalWidth = svgElement.style.width;
      svgElement.style.padding = '0px';
      svgElement.style.padding = '32px';
      svgElement.style.width = '320px';

      downloadElementAsImage(svgElement, `TraxiQR_${title}`);
      svgElement.style.padding = originalPadding;
      svgElement.style.width = originalWidth;
    }
  }, [title]);

  return (
    <Box sx={{ marginTop: -2 }}>
      <Stack
        id='passengerCode'
        alignItems='center'
        justifyContent='center'
        gap={2}
        padding={{ xs: 0, sm: 2 }}
        paddingY={{ xs: 1, sm: 2 }}
        sx={{ backgroundColor: 'white' }}
      >
        <SvgRenderer
          src='./src/assets/img/traxiBy_logo.svg'
          width={148}
          height={50}
          fill='black'
        />
        {value && (
          <QRCode
            size={256}
            value={value}
            viewBox='0 0 256 256'
            style={{
              height: 'auto',
              maxWidth: '100%',
              width: '100%',
            }}
          />
        )}
        {passengerInformation.map((passenger, i) => (
          <Box
            key={i}
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            <Typography fontWeight='bold' color='black' sx={TEXT_STYLES}>
              {passenger.label}
            </Typography>
            <Typography fontWeight='bold' color='black' sx={TEXT_STYLES}>
              {passenger.value}
            </Typography>
          </Box>
        ))}
      </Stack>
      <Button
        fullWidth
        variant='contained'
        onClick={() => {
          setDownloadClickCount(downloadClickCount + 1);
          downloadPassengerCode();
        }}
        disabled={disableDownload}
        startIcon={<FileDownloadOutlined />}
        sx={{ marginBottom: 2 }}
      >
        {'download'}
      </Button>
      <Button
        fullWidth
        variant='outlined'
        onClick={handleClose}
        startIcon={<Close />}
      >
        {'close'}
      </Button>
    </Box>
  );
}
