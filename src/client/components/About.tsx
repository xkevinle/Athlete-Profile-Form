import React from 'react';
import { Box } from '@mui/system';
import { LocationOn } from '@mui/icons-material';
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBL0LxdNdBu-B23mDF7fiprRYwHEITQcBw';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}
interface IAboutProps {
  about: {
    interests: string;
    location: string;
    team: string;
  };
  setAbout: React.Dispatch<React.SetStateAction<{
    interests: string;
    location: string;
    team: string;
  }>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function About(props: IAboutProps) {
  const [value, setValue] = React.useState<PlaceType | null>({
    description: props.about.location,
    structured_formatting: {
      main_text: '',
      secondary_text: '',
      main_text_matched_substrings: []
    }
  });
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [missingInputsError, setMissingInputsError] = React.useState('');
  const loaded = React.useRef(false);


  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        200,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleInterests = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setAbout({ ...props.about, interests: event.target.value });
  };

  const handleTeam = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setAbout({ ...props.about, team: event.target.value });
  };

  const handleNextButton = () => {
    if (!props.about.interests || !props.about.team || !props.about.location) {
      setMissingInputsError('Missing inputs!')
    }
    else props.setPage(props.page + 1)
  }

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h4" >About</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 2 }}>
        <TextField id="outlined-basic" label="Interests" variant="outlined" onChange={handleInterests} value={props.about.interests} />
        <TextField id="outlined-basic" label="Team (ex: Cowboys)" variant="outlined" onChange={handleTeam} value={props.about.team} />
        <Autocomplete
          id="google-map-demo"
          sx={{ width: 300 }}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          onChange={(event: any, newValue: PlaceType | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            props.setAbout({ ...props.about, location: newInputValue })
          }}
          renderInput={(params) => (
            <TextField {...params} label="Enter location" fullWidth />
          )}
          renderOption={(props, option) => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match: any) => [match.offset, match.offset + match.length]),
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Box
                      component={LocationOn}
                      sx={{ color: 'text.secondary', mr: 2 }}
                    />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </Box>
      <Typography sx={{ textAlign: 'center' }}>{missingInputsError}</Typography>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0 }} variant="contained" onClick={() => props.setPage(props.page - 1)} >Back</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0 }} variant="contained" onClick={handleNextButton} >Next</Button>
    </Box>
  )
}

export default About;
