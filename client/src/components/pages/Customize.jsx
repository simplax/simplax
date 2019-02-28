import React, { useEffect } from 'react';
import CustomizeForm from '../CustomizeForm';
import CodeSnippetModal from '../CodeSnippetModal';

export default function Customize(props) {
  useEffect(() => {
    console.log(props.location.state.likes);
  }, []);
  return (
    <div className="Customize">
      <CustomizeForm property="scale" unit="" start={1} end={2} />
      <CustomizeForm property="rotate" unit="deg" start={0} end={90} />
      <CodeSnippetModal />
    </div>
  );
}
