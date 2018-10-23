import React, { Component } from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';


// This component requires currentlocation to be passed as a prop whenever used.
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { getGeoLocation } = this.props;
    getGeoLocation();
  }

  render() {
    const { currentLocation, markers } = this.props;
    console.log('currentlocation', currentLocation);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 33.43291105, lng: -112.00942178438316 }}
        >
          {markers.length > 0 ? (
            markers.map((element, index) => (
              <Marker key={index} title={element.name} position={element.coords} icon={element.icon} />
            ))
          ) : null}
        </GoogleMap>
      </div>
    );
  }
}

const Map1 = withScriptjs(withGoogleMap(Map));

export default Map1;
