import React from 'react';
import { Box } from '@mui/system';
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Theme, useTheme, OutlinedInput } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import sports from '../data/sports';

interface IBasicInfoProps {
  basicInfo: {
    firstName: string;
    lastName: string;
    sports: string[];
    gender: string;
    dob: Date;
  };
  setBasicInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    sports: string[];
    gender: string;
    dob: Date;
  }>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, sport: string[], theme: Theme) {
  return {
    fontWeight:
      sport.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function BasicInfo(props: IBasicInfoProps) {
  const theme = useTheme();
  const [dob, setDob] = React.useState<Dayjs | null>(dayjs(props.basicInfo.dob));
  const [missingInputsError, setMissingInputsError] = React.useState('');

  const handleFirstName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setBasicInfo({ ...props.basicInfo, firstName: event.target.value })
  };

  const handleLastName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setBasicInfo({ ...props.basicInfo, lastName: event.target.value })
  };

  const handleSelectedSports = (event: SelectChangeEvent<typeof props.basicInfo.sports>) => {
    const {
      target: { value },
    } = event;
    props.setBasicInfo({ ...props.basicInfo, sports: typeof value === 'string' ? value.split(',') : value })
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    props.setBasicInfo({ ...props.basicInfo, gender: event.target.value });
  };

  const handleDobChange = (newValue: Dayjs | null) => {
    setDob(newValue);
    props.setBasicInfo({ ...props.basicInfo, dob: newValue?.toDate() as Date })
  };

  const handleNextButton = () => {
    if (!props.basicInfo.firstName || !props.basicInfo.firstName || !props.basicInfo.gender || !props.basicInfo.sports) {
      setMissingInputsError('Missing inputs!')
    }
    else props.setPage(props.page + 1)
  }

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h4" >Basic Information</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 2 }}>
        <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={handleFirstName} value={props.basicInfo.firstName} />
        <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={handleLastName} value={props.basicInfo.lastName} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={props.basicInfo.gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="MM/DD/YYYY"
              value={dob}
              onChange={handleDobChange}
              renderInput={(params) => <TextField {...params} sx={{ maxWidth: 150 }} />}
            />
          </LocalizationProvider>
        </Box>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sport-label">Sports</InputLabel>
          <Select
            labelId="sport-label"
            id="sport"
            multiple
            value={props.basicInfo.sports}
            onChange={handleSelectedSports}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {sports.map((sport) => (
              <MenuItem
                key={sport}
                value={sport}
                style={getStyles(sport, props.basicInfo.sports, theme)}
              >
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography sx={{ textAlign: 'center' }}>{missingInputsError}</Typography>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0 }} variant="contained" onClick={() => props.setPage(3)} >List of profiles</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0 }} variant="contained" onClick={handleNextButton} >Next</Button>
    </Box>
  )
}

export default BasicInfo;
