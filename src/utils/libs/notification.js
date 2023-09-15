import React from "react";
import { useSnackbar } from "notistack";


// eslint-disable-next-line react/prop-types
const InnerSnackbarUtilsConfigurator = ({ setUseSnackbarRef }) => {
  setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => (
  <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
);

export default {
  close(msg) {
    this.closeToast(msg);
  },
  closeToast(msg) {
    useSnackbarRef.closeSnackbar(msg);
  },
  default(msg, options = {}) {
    this.toast(msg, { ...options, variant: "default" });
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: "error" });
  },
  info(msg, options = {}) {
    this.toast(msg, { ...options, variant: "info" });
  },
  success(msg, options = {}) {
    this.toast(msg, { ...options, variant: "success" });
  },
  toast(msg, options = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
  warning(msg, options = {}) {
    this.toast(msg, { ...options, variant: "warning" });
  },
};

export const useNotification = () => ({
  close(msg) {
    this.closeToast(msg);
  },
  closeToast(msg) {
    useSnackbarRef.closeSnackbar(msg);
  },
  default(msg, options = {}) {
    this.toast(msg, { ...options, variant: "default" });
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: "error" });
  },
  info(msg, options = {}) {
    this.toast(msg, { ...options, variant: "info" });
  },
  success(msg, options = {}) {
    this.toast(msg, { ...options, variant: "success" });
  },
  toast(msg, options = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
  warning(msg, options = {}) {
    this.toast(msg, { ...options, variant: "warning" });
  },
});
