import { Modal } from "flowbite";

/**
 * @param {*} id
 * @param {{
 * onHide?: (modal: import("flowbite").ModalInterface) => void,
 * onShow?: (modal: import("flowbite").ModalInterface) => void,
 * onToggle?: (modal: import("flowbite").ModalInterface) => void
 * }} param1
 * @returns
 */
export function modal(id, { onHide, onShow, onToggle }) {
  return new Modal(document.getElementById(id), {
    placement: "center",
    backdrop: "dynamic",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    closable: true,
    onHide: onHide ? onHide : () => {},
    onShow: onShow ? onShow : () => {},
    onToggle: onToggle ? onToggle : () => {},
  });
}
