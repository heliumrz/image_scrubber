import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { Link } from 'react-router-dom';
import '@aws-amplify/ui/dist/style.css';
import image1 from './images/5990111.jpg';
import image2 from './images/blurface.jpg';
import image3 from './images/words.jpg';
import {AmplifySignOut} from "@aws-amplify/ui-react";

Amplify.configure(aws_exports);


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function App() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/*<CameraIcon className={classes.icon} />*/}
                    <Typography variant="h6" color="inherit" noWrap>
                        CET 2021 Global Hackathon (07/19/21 - 08/31/21)
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            PII Image Scrubber And Analyze Tool
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            This Image PII Scrub and Analyze tool will help to scrub out confidential information from
                            images including greying out faces, removing street addresses, phone numbers and any other
                            visible PII from images. It will also extract useful information from images such as expiry
                            dates, package number, brand name/color to find expired products or product mismatch. This
                            can be used to filter out unwanted images while looking for a certain defect/issue reported
                            and speed up investigation. Moving forward, this tool can be added to Heartbeat’s ingestion
                            pipeline to analyze images from product reviews and social media posts real-time.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Result Summary
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                            <Grid item key={1} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={image1}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Image Processing
                                        </Typography>
                                        <Typography>
                                            Users can upload image(s) to this tool and perform image scrubbing and analysis.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to="/ImageProcess"><Button variant="outlined" color="primary">
                                            Try Me
                                        </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item key={2} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={image2}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Image Output
                                        </Typography>
                                        <Typography>
                                            View and download output scubbered images.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to="/ImageOutput"><Button variant="outlined" color="primary">
                                            View
                                        </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item key={3} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={image3}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Analysis Output
                                        </Typography>
                                        <Typography>
                                            View and download analyzed Json output.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to="/AnalysisOutput"><Button variant="outlined" color="primary">
                                            View
                                        </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    TEAM SCRUBS AND SCAN
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
            <AmplifySignOut />
        </React.Fragment>
    );
}

export default App;
