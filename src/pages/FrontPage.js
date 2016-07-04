import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {Button, Grid, Row, Col, Collapse, Glyphicon} from 'react-bootstrap';

import * as actionCreators from '../action_creators';
import {getFilteredCourses} from '../selectors/course';
import CourseList from '../components/CourseList/CourseList';
import LessonFilter from '../components/Filter/LessonFilter';
import ButtonItem from '../components/ButtonItem';
import styles from './FrontPage.scss';

export const  FrontPage = React.createClass({

  getInitialState() {
    return {
      show: false,
      showMobileFilter: false
    };
  },

  render() {
    const hrefAssistant = 'http://kidsakoder.no/kodeklubben/';
    const hrefTeacher = 'http://kidsakoder.no/skole/';

    return (
      <Grid fluid={true}>
        {/* Front page title */}
        <Row>
          <div className={styles.title}>
            <span className={styles.t1}>kode</span><span className={styles.t2}>klubben_</span>
          </div>
        </Row>

        {/* Buttons */}
        <Row>
          <div className={styles.center}>
            <ButtonItem color='green' onClick={() => this.displayExercise}>
              Kom i gang!
            </ButtonItem>
            <ButtonItem color='blue' onClick={() => this.setState({show: !this.state.show})}>
              Lærer/Veileder
            </ButtonItem>
          </div>
        </Row>

        {/* Collapse infobox */}
        <Row>
          <Collapse in={this.state.show}>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxRow}>
                <div className={styles.infoBoxItem}>
                  Du er nå lærermodus!
                  <br /><br />
                  Klikk på elev/lærer knappen i navigasjonsmenyen for å skifte modus.
                  Når du er i lærer-modus vil skoleemner ligge øverst i oppgavefilteret.
                </div>
              </div>
              <div className={styles.infoBoxRow}>
                <div>
                  <h3>Lærer</h3>
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  <br /><br />
                  <a className={styles.link} href={hrefAssistant}>Lær mer</a>
                </div>
                <div>
                  <h3>Veileder</h3>
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  text text text text text text text text text text text
                  <br /><br />
                  <a className={styles.link} href={hrefTeacher}>Lær mer</a>
                </div>
              </div>
            </div>
          </Collapse>
        </Row>

        <Row>
          {/*Filter desktop*/}
          <Col xsHidden sm={4} md={3} lg={2}>
            <br/>
            <LessonFilter {...this.props}/>
          </Col>

          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden xs={12}>
            <br/>
            <Button bsStyle='success' onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>
              <Glyphicon glyph={this.state.showMobileFilter ? 'chevron-down' : 'chevron-right'}/>
              Vis/skjul filter
            </Button>
            <br/>
            <br/>
            <Collapse in={this.state.showMobileFilter}>
              <div>
                <LessonFilter {...this.props}/>
              </div>
            </Collapse>
          </Col>

          <Col xs={12} sm={8} md={9} lg={10}>
            <h2>Kurs</h2>
            <CourseList courses={this.props.courses}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

FrontPage.propTypes = {
  courses: PropTypes.object,
  filter: PropTypes.object,
  onFilterCheck: PropTypes.func
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    filter: state.filter
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(FrontPage));
