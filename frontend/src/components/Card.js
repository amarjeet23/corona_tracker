import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
      minWidth:275,
      minHeight:200,
    
    backgroundColor:`#74B9FF`,
    textAlign:'center',
    borderRadius:'3%'
   
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardView({
    title = 'my title',
    count
}) {
  const classes = useStyles();
 

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h6" component="h3" style={{color:'white'}}>
         {title}
        </Typography>
        <p style={{border :'1px solid #019031'}}></p>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="h6" component="h3" style={{marginTop:'40px',color:"white"}}>
          {count}
          <br />
          
        </Typography>
        
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}