import './Modal.less'
import {ReactNode} from "react";

const defaultProps = {
    saveButtonShow: false,
    footerShow: false,
    saveButtonText: "Ok",
    saveButtonClass: "btn-success",
    size: "",
    cancelButtonText: "Abbrechen",
    onSave: () => {
    }
}
type DefaultProps = Partial<typeof defaultProps>;
type ModalProps = {
    showModal: boolean;
    title: string;

    onCancel: () => void;

    children: ReactNode;
} & DefaultProps;

function Modal(props: ModalProps) {
    console.log(props.saveButtonText);
    return props.showModal && (
        <div className="modal-container">
            <span className="modal-background" onClick={props.onCancel}/>
            <div className="modal-mask">
                <div className="modal-wrapper">
                    <div className="modal-dialog" role="document">
                        <div className={"modal-content " + props.size}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {props.title}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" onClick={props.onCancel}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {props.children}
                            </div>
                            {props.footerShow &&
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={props.onCancel}>
                                        {props.cancelButtonText}
                                    </button>
                                    {props.saveButtonShow &&
                                        <button type="button" className={"btn " + props.saveButtonClass} onClick={props.onSave}>
                                            {props.saveButtonText}
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = defaultProps;

export default Modal;