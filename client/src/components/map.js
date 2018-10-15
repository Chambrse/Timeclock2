import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// This component requires currentlocation to be passed as a prop whenever used.
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };
  }

  componentWillMount() {
    this.props.getGeoLocation();
  }

  render() {
    const { currentLocation } = this.props;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCKrVlx0xjdrNE4co1DPg8617iC-dwcfDQ' }}
          defaultCenter={[33, -111]}
          center={currentLocation}
          defaultZoom={11}
        />
      </div>
    );
  }
}

export default Map;
