import React from "react";
import { Dialog } from "primereact/dialog";

// Prop structure for modal
interface Props {
    visible: boolean,
    label: string
    children: React.ReactNode;
    setVisible: any    
}
export default function Modal(props: Props) {
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={props.label}
        visible={props.visible}
        onHide={() => {
          if (!props.visible) return;
          props.setVisible(false);
        }}
      >
        <div className="m-0">
          {/* Content will display here */}
            {props.children}
        </div>
      </Dialog>
    </div>
  );
}
