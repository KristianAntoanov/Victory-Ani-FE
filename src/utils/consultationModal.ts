export const CONSULTATION_MODAL_EVENT = 'open-consultation-modal';

export function openConsultationModal() {
  window.dispatchEvent(new CustomEvent(CONSULTATION_MODAL_EVENT));
}
