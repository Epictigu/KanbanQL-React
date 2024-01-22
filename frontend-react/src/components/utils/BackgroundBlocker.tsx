import {CSSProperties} from "react";

const defaultProps = {
    backgroundColor: "transparent",
    customZIndex: 50
}
type BackgroundProps = Partial<typeof defaultProps>;

function BackgroundBlocker(props: BackgroundProps) {
    const style: CSSProperties = {
        backgroundColor: props.backgroundColor,
        zIndex: props.customZIndex
    }

    return (<>
        <div className="click-blocker" style={style}></div>
    </>)
}

export default BackgroundBlocker;