import React,{useEffect} from 'react';
import {useSelector} from 'react-redux'
import PinkBox from "../components/PinkBox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import {  Navigate } from "react-router-dom";
// import getLoginDetails from '../utils/getLoginDetails'

const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
});

const Home = () => {

    const user=useSelector(state=>state.user)
    console.log(`Printing user value from store`,JSON.stringify(user))
    const {
        token,
        authenticated
      } = user;
    useEffect(() => {
        // const loginDetails = getLoginDetails();
        // console.log(JSON.stringify(loginDetails))
      }, []);
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