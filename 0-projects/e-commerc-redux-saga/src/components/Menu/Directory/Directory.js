import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../../redux-state/directory/directory.selectors";

import "./Directory.scss";
import Item from "../Item/Item";

const Directory = ({ section }) => {
  return (
    <div className="directory-menu">
      {section.map(elem => (
        <Item item={elem} key={elem.id} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectDirectorySections
});
export default connect(mapStateToProps)(Directory);
