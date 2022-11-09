export const hideModal = (modal_selector) => {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById(modal_selector)
  );
  modal.hide();
};
