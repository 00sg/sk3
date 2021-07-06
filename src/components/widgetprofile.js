import React from "react";
import "./widgetprofile.css";
import WidgetContent from "./WidgetContent";

function widgetprofile() {


  return (
    <div className="widget">
      <div className="widget__header">
        <h5>Spaces to follow</h5>
      </div>
      <div className="widget__contents">
        <WidgetContent />
      </div>
    </div>
  );
}

export default widgetprofile;
