import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { CpnButton } from "../button";
import zIndex from "@mui/material/styles/zIndex";
import useSliceString from "../hook/useSliceString";
import { FormAccount } from "../form";

export default function BasicModal({
  textButton = "Create new Account",
  children,
  variant,
  color,
  data,
  header = "  Create New Account",
}) {
  const [open, setOpen] = React.useState(false);
  const [mouseTg, setMouseTg] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { newSlice } = useSliceString();
  const useMouse = () => {
    const [mouseTion, setMouseTion] = React.useState({
      x: 0,
      y: 0,
    });
    React.useEffect(() => {
      if (open) {
        const handle = (e) => {
          if (mouseTg) {
            setMouseTion({
              x: e.pageX,
              y: e.pageY + 250,
            });
            console.log("ok");
          }
        };
        document.addEventListener("mousemove", handle);
        return () => {
          document.removeEventListener("mousemove", handle);
        };
      }
    });
    React.useEffect(() => {
      !open && setMouseTion({ x: 0, y: 0 });
    }, [open]);
    return mouseTion;
  };

  const { x, y } = useMouse();
  React.useEffect(() => {
    if (!open) {
      setMouseTg(false);
    }
  });
  const style = {
    position: "absolute",
    top: `${y > 0 ? `${y}px` : "50%"}`,
    left: `${x > 0 ? `${x}px` : "50%"}`,
    transform: `translate(-50%, -50%)`,
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,

    zIndex: 2,
  };

  return (
    <div>
      <Button
        onClick={handleOpenModal}
        variant={variant}
        color={color}
        size="large"
      >
        {textButton}
      </Button>

      <Modal
        open={open}
        onClose={handleCloseModal}
        sx={zIndex}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-y-scroll"
      >
        <Box
          sx={style}
          onClick={() => {
            if (mouseTg) {
              setMouseTg(false);
            }
          }}
          className={`${mouseTg && "cursor-pointer"} `}
        >
          <div
            className={`flex justify-between items-center cursor-pointer flex-shrink-0 select-none p-2 rounded-full mb-2 eve  ${
              mouseTg
                ? "bg-cyan-500 text-white"
                : "bg-slate-300 pointer-events-auto"
            }`}
            onClick={() => {
              setMouseTg(true);
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ px: 2 }}
            >
              {header} {data?.id}
            </Typography>

            <CloseIcon
              onClick={handleCloseModal}
              fontSize="large"
              className="hover:text-red-500 hover:bg-gray-200 rounded-full p-1"
            ></CloseIcon>
          </div>

          {children ? (
            children
          ) : (
            <FormAccount
              data={data}
              btnSubmit={data && "Save"}
              closeModal={handleCloseModal}
            ></FormAccount>
          )}
        </Box>
      </Modal>
    </div>
  );
}
