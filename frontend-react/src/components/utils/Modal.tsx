import './Modal.less'

const defaultProps = {
    saveButtonShow: false,
    footerShow: false,
    saveButtonText: "Ok",
    saveButtonClass: "btn-success",
    size: "",
    cancelButtonText: "Abbrechen"
}
type DefaultProps = Partial<typeof defaultProps>;
type ModalProps = {
    showModal: boolean;
    onSave: () => void;
    onCancel: () => void;
} & DefaultProps;

function Modal(props: ModalProps) {
    return props.showModal && (
        <div className="modal-container">
            <span className="modal-background" onClick={props.onCancel}/>
            <div className="modal-mask">
                <div className="modal-wrapper">
                    <div className="modal-dialog" role="document">
                        <div className={"modal-content " + props.size}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <slot name="modal-title"></slot>
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" onClick={props.onCancel}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <slot name="modal-body"></slot>
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

export default Modal;