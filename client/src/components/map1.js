import React, { Component } from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';


// This component requires currentlocation to be passed as a prop whenever used.
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };
  }

  componentDidMount() {
    const { getGeoLocation, EmpData } = this.props;
    getGeoLocation();

    const coords = [];
    EmpData.data.forEach((n) => {
      console.log('empdata loop', n);
      coords.push(n.timeClockData[0].coords);
    });

    this.setState({
      markers: coords,
    });
  }

  render() {
    const { currentLocation } = this.props;
    const { markers } = this.state;
    console.log('currentlocation', currentLocation);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 33.43291105, lng: -112.00942178438316 }}
        >
          {markers.length > 0 ? (
            markers.map((element, index) => (
              <Marker key={index} position={{ lat: element.lat, lng: element.lng }} />
            ))
          ) : null}
        </GoogleMap>
      </div>
    );
  }
}

const Map1 = withScriptjs(withGoogleMap(Map));

export default Map1;
