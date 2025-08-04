import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
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

const iconMap = {
  SportsEsports: SportsEsportsIcon,
  Code: CodeIcon,
  Lightbulb: EmojiObjectsIcon,
  Book: MenuBookIcon,
  Science: ScienceIcon,
  Psychology: PsychologyIcon,
  Language: LanguageIcon,
  School: SchoolIcon,
};

const AdminQuizCard = ({ quiz, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleModify = () => {
    handleMenuClose();
    navigate(`/admin/set-test/${quiz.id}`);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    onDelete(quiz.id); 
  };

  const IconComponent = iconMap[quiz.icon] || SportsEsportsIcon;

  return (
    <div className="w-full max-w-xs p-2 flex flex-col">
      <Paper
        elevation={4}
        className="relative w-full rounded-xl mb-0 bg-white hover:shadow-lg transition-all min-h-[150px]"
      >

        {/* ✅ Responsive Top-right menu */}
        <IconButton
          onClick={handleMenuOpen}
          className="absolute top-0 left-65 text-gray-600 hover:text-blue-600"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>


        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
  <MenuItem onClick={handleModify}>Modify</MenuItem>
  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>

        {/* Icon and Name */}
        <Box className="flex-1 flex flex-col justify-center items-center text-center ">
          {IconComponent && (
            <IconComponent className="text-blue-800 " style={{ fontSize: 80 }} />
          )}
          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800"
            style={{ wordBreak: 'break-word' }}
          >
            {quiz.name}
          </Typography>
        </Box>
      </Paper>

      {/* Start Button */}
      <Button
        size="small"
        variant="contained"
        color="primary"
        className="mt-2"
        onClick={() => navigate(`/rules/${quiz.id}`)}
        fullWidth
      >
        Start
      </Button>
    </div>
  );
};

export default AdminQuizCard;
