const ModalOverlay = ({ closeModal }: { closeModal(): void }) => (
  <div
    className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[998]"
    onClick={closeModal}
  >
  </div>
);

export default ModalOverlay;
