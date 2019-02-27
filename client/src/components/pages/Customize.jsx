import React from "react";
import CustomizeForm from "../CustomizeForm";

export default function Customize() {
  return (
    <div className="Customize">
      <CustomizeForm property="scale" unit="" start={1} end={2} />
      <CustomizeForm property="rotate" unit="deg" start={0} end={90} />
    </div>
  );
}
