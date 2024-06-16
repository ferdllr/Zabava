import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px', // Gap between cards
});

// Interface definition LocalData
interface LocalData {
  nome: string;
  bairro: string;
  endereco: string;
  capacidade: number;
  rank: number;
  descricao: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface LocalCardProps {
  local: LocalData;
}

const LocalCard: React.FC<LocalCardProps> = ({ local }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderStars = (rank: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rank) {
        stars.push(<StarIcon key={i} sx={{ color: yellow[700] }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: yellow[700] }} />);
      }
    }
    return stars;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="local">
            {local.nome[0]}
          </Avatar>
        }
        title={local.nome}
        subheader={`${local.bairro}, ${local.endereco}`}
      />
      <CardMedia
        component="img"
        height="194"
        image="/venue.png" // Substitua pelo caminho da imagem real
        alt={local.nome}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Capacidade: {local.capacidade}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Extras: Piscina, 100m², 3 ambientes, etc.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descrição:</Typography>
          <Typography paragraph>{local.descricao}</Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        {renderStars(local.rank)}
      </CardActions>
    </Card>
  );
};

interface LocalListProps {
  data: LocalData[];
}

const LocalList: React.FC<LocalListProps> = ({ data }) => {
  return (
    <CardContainer>
      {data.map((local: LocalData, index: number) => (
        <LocalCard key={index} local={local} />
      ))}
    </CardContainer>
  );
};

export default LocalList;