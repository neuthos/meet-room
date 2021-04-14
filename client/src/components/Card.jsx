import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
export default function Home({ room }) {
  const classes = useStyles();
  const history = useHistory();

  function toDetail() {
    history.push(`/detail/${room.id}`);
  }

  function toBook() {
    history.push(`/book/${room.id}`);
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea onClick={toDetail}>
          <CardMedia
            className={classes.media}
            image={room.image}
            title="Contemplative Reptile"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {room.name}
            </Typography>
            <h4>Status: {room.isUsed ? "Used" : "Open"}</h4>
            <Typography variant="body2" color="textSecondary" component="p">
              {room.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={toBook}>
            Book Room
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
