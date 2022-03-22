import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import tile from "./assets/user.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Divider } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "react-bootstrap/Card";
import { CardContent, CardMedia, Box, Button } from "@mui/material";

const styles = (theme) => ({
  ...theme.spread,
  root: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    width: "300px",
    height: "290px",
    position: "relative",
    display: "flex",
    FavoriteBorderIcon,
  },
  image: {
    width: "450px",
    height: "210px",
    // backgroundSize: 'cover',
    // objectFit : 'cover',
    // resize: 'both',
    // backgroundPosition: 'center',
    // margin:'10px'
  },
  // link : {
  //     "&:hover": {
  //         textDecoration : 'none',
  //     },
  //     marginRight : '26px',
  //     marginTop : '30px',
  // },
  // card : {
  //     width : '300px',
  //     height : '190px',
  //     position: 'relative',
  //     display : 'flex',
  // },
  name: {
    fontSize: "15px",
    fontWeight: "600",
    color: "black",
    overflow: "hidden",
    maxHeight: "20px",
    maxWidth: "300px",
    textDecoration: "none",
  },
  button: {
    color: "black",
    fontFamily:
      "Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif",
    fontWeight: "50",
    fontSize: "13px",
  },
});
class Product extends Component {
  state = {
    spacing: "16",
  };

  render() {
    const { classes } = this.props;
    const {
      id,
      url,
      name,
      category,
      description,
      price,
      qty_available,
      shopId,
      sold,
    } = this.props.product;
    console.log(`Inside product`);
    return (
      <div>
        <Grid container className={classes.card}>
          <Grid container item xs={12} sm={12}>
            <Box sx={{ width: 350, height: 300, borderColor: "orange" }}>
              <Card className={classes.cardSize}>
                <CardContent>
                  <Link to={`/productview/${id}`}>
                    <div key={id} className="productStyle">
                      <CardMedia
                        component="img"
                        image={url}
                        className={classes.image}
                      />
                      <Grid container item xs={12} className={classes.name}>
                        {name} *
                      </Grid>
                      <Grid container item xs={12} className={classes.name}>
                        {price}
                      </Grid>
                    </div>
                  </Link>
                  <Grid container item xs={12}>
                    <Button
                      className={classes.button}
                      component={Link}
                      to="/buy"
                    >
                      Buy Now
                    </Button>
                    <Button
                      size="large"
                      startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}
                      className={classes.button}
                      component={Link}
                      to="/fav"
                    ></Button>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Product));
