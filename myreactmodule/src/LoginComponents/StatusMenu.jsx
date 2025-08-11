import { Button,Menu,MenuItem } from "@ui5/webcomponents-react";
import { useRef, useState } from "react";
const StatusMenu = () => {
    const popoverRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpenerClick = (e) => {
      if (popoverRef.current) {
        popoverRef.current.opener = e.target;
        setOpen((prev) => !prev);
      }
    };
    return (
      <>
        <Button design="Transparent" onClick={handleOpenerClick}>...</Button>
        <Menu ref={popoverRef} open={open}>
        <MenuItem  text="Online" />
        <MenuItem  text="Offline" />
        {/* <MenuItem  text="Away" /> */}
        </Menu>
      </>
    );
  };
  export default StatusMenu;