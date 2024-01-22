import NavigationBar from "./NavigationBar.tsx";
import Modal from "./utils/Modal.tsx";
import {useState} from "react";

function Home() {
    const [shouldShowModal, setShouldShowModal] = useState(true);

    const saveModal = () => {
        setShouldShowModal(false);
        console.log("SAVED!");
    }
    const cancelModal = () => {
        setShouldShowModal(false);
        console.log("CANCELED!");
    }

    return <>
        <NavigationBar/>
        <Modal title="TestModal" showModal={shouldShowModal} onSave={saveModal} onCancel={cancelModal} footerShow={true} saveButtonShow={true}>
            Dies ist ein Testtext!!!
        </Modal>
    </>
}

export default Home;