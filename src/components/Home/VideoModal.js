import { Modal } from "react-bootstrap";
import styles from "./home.module.css";

const VideoModal = ({ onShow, onHandleClose }) => (
  <Modal size="xl" show={onShow} onHide={onHandleClose}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <iframe
        className={styles.modalVideo}
        allowFullScreen
        title={new Date().getTime()}
        src={onShow || ""}
      />
    </Modal.Body>
  </Modal>
);

export default VideoModal;
