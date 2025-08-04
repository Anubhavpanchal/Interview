import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import {
  SportsEsports as SportsEsportsIcon,
  Code as CodeIcon,
  EmojiObjects as EmojiObjectsIcon,
  MenuBook as MenuBookIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

export const iconList = [
  { name: 'SportsEsports', icon: SportsEsportsIcon },
  { name: 'Code', icon: CodeIcon },
  { name: 'Lightbulb', icon: EmojiObjectsIcon },
  { name: 'Book', icon: MenuBookIcon },
  { name: 'Science', icon: ScienceIcon },
  { name: 'Psychology', icon: PsychologyIcon },
  { name: 'Language', icon: LanguageIcon },
  { name: 'School', icon: SchoolIcon },
];

const SetIcons = ({ selected, onSelect }) => {
  return (
    <Box className="p-4">
      <Grid container spacing={2}>
        {iconList.map((item) => {
          const IconComponent = item.icon;
          return (
            <Grid item xs={3} sm={2} key={item.name}>
              <IconButton
                onClick={() => onSelect(item.name)}
                className={`border p-2 w-full rounded-md ${
                  selected === item.name ? 'bg-blue-200' : ''
                }`}
              >
                <IconComponent fontSize="large" />
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SetIcons;
