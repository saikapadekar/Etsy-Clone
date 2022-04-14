import React from 'react';
import PinkBox from "../components/PinkBox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
});

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <PinkBox/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid direction="row" container className={classes.main}>
            <Grid
            container
            item
            style={{ paddingLeft: "5px" }}
            spacing={0.5}
            xs={12}
            >
            </Grid>



            </Grid>
        </div>
    );
};

export default Home;