import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './CustomGrid.module.css';
import { Button, Modal, Typography } from '@material-ui/core';
import _ from 'lodash';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const CustomGrid = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState({});
  const [groupedPassports, setGroupedPassports] = useState({});
  const classes = useStyles();

  const handleOpenModal = (passport) => {
    setSelectedPassport(passport);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPassport({});
    setOpen(false);
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      groupDataWithContinent();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getImageUrl = (imageName) => {
    return `${process.env.PUBLIC_URL}/images/passports/${imageName}`;
  };

  const FormRow = ({ passports }) => {
    return (
      <>
        {_.map(passports, (passport) => (
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            key={passport.countryCode}
            style={{ height: 300, maxWidth: '12%' }}
          >
            <Button className={styles.zoom} style={{ height: 280 }}>
              <Paper className={classes.paper} style={{ height: 280 }}>
                <img
                  className={styles.image}
                  src={getImageUrl(passport.imageName)}
                  alt={passport.countryName}
                  onClick={() => handleOpenModal(passport)}
                />
                <p className={styles.countryName}>{passport.countryName}</p>
              </Paper>
            </Button>
          </Grid>
        ))}
      </>
    );
  };

  const currentContinent = selectedPassport.continent;

  const findIndex = () => {
    return _.findIndex(
      groupedPassports[currentContinent],
      (passport) => passport.countryCode === selectedPassport.countryCode
    );
  };

  const goToPreviousPassport = () => {
    const index = findIndex();
    setSelectedPassport(groupedPassports[currentContinent][index - 1]);
  };

  const goToNextPassport = () => {
    const index = findIndex();
    setSelectedPassport(groupedPassports[currentContinent][index + 1]);
  };

  const groupDataWithContinent = () => {
    const groupedData = _.groupBy(data, (passport) => passport.continent);
    setGroupedPassports(groupedData);
  };

  const isFirst = findIndex() === 0;
  const isLast =
    !_.isEmpty(selectedPassport) &&
    findIndex() === groupedPassports[currentContinent].length - 1;

  const DataPaper = ({ text, data }) => (
    <Paper className={styles.data}>
      <Typography variant="h6">{text}</Typography>
      <Typography variant="h4">{data}</Typography>
    </Paper>
  );

  const dataPaper = [
    {
      text: 'Visa Free',
      data: selectedPassport.visaFree,
    },
    {
      text: 'Visa On Arrival',
      data: selectedPassport.visaOnArrival,
    },
    {
      text: 'Visa Required',
      data: selectedPassport.visaRequired,
    },
  ];

  return (
    <div className={classes.root}>
      <div className={styles.header2}>
          <h1 className={styles.header2}>Explore passports</h1>
          <h5 className={styles.header2}>
                Find and learn more about different passports
          </h5>
      </div>
      <Grid container spacing={3} style={{ marginTop: '1rem' }}>
        {_.map(groupedPassports, (continentPassports, continentName) => (
          <React.Fragment key={continentName}>

            <h1 style={{ color: '#1c5f71' }}>{continentName}</h1>
            <Grid container item spacing={3} xs={12} md={12}>
              <FormRow passports={continentPassports} />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <div className={styles.modalBackground} />
          {!isFirst && (
            <ArrowBackIosIcon
              className={styles.prevBtn}
              onClick={goToPreviousPassport}
            />
          )}
          <img
            width="350px"
            src={getImageUrl(selectedPassport.imageName)}
            alt={selectedPassport.countryName}
            className={styles.modalImage}
          />
          <div className={styles.modalContent}>
            <div className={styles.dataContainer}>
              {_.map(dataPaper, ({ data, text }) => (
                <DataPaper data={data} text={text} />
              ))}
            </div>
          </div>
          {!isLast && (
            <ArrowForwardIosIcon
              className={styles.nextBtn}
              onClick={goToNextPassport}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomGrid;
