import './NavigationBar.less'

function NavigationBar() {
    return (<>
        <div className="navigation-bar">
            <i className="fa-solid fa-clipboard-list app-icon mr-2"></i>
            <span className="app-title">KanbanQL</span>
            <button className="btn btn-primary ticket-add-button">Ticket hinzufügen</button>
            <button className="btn btn-primary ticket-add-button">Tags bearbeiten</button>
        </div>
    </>);
}

export default NavigationBar;