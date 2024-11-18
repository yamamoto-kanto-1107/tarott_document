import type { DefaultsInstance } from "vuetify/lib/framework.mjs";

export const defaults: DefaultsInstance = {
  VAppBar: {
    elevation: 1,
    height: 48,
  },
  VSelect: {
    density: "compact",
    variant: "outlined",
    hideDetails: "auto",
  },
  VList: {
    density: "compact",
    // activeColor: "#00896B",
    // baseColor: "primary",
    // // bgColor: "#00896B",
    // color: "primary",
  },
  VBtn: {
    color: "primary",
    // variant: "flat",
    // height: 38,
    // rounded: "lg",
    // size: "small",
  },
  VCheckbox: {
    density: "compact",
    hideDetails: true,
  },
  VRadioGroup: {
    density: "compact",
    hideDetails: true,
  },
  VRadio: {
    density: "compact",
    hideDetails: true,
  },
  VTextField: {
    color: "primary",
    variant: "outlined",
    density: "compact",
    hideDetails: "auto",
  },
  VTextarea: {
    color: "primary",
    variant: "outlined",
    density: "compact",
    hideDetails: "auto",
  },
};
