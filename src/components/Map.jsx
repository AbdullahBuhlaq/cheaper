function Map(props) {
  return (
    <>
      <div className="gmap_canvas">
        <iframe width={props.width} height={props.height} id="gmap_canvas" src={`https://maps.google.com/maps?q=${props.lat},${props.long}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
      </div>
    </>
  );
}

export default Map;
