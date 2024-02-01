import './BackgroundBlocker.less';
import {CSSProperties} from "react";

const defaultProps = {
    backgroundColor: "transparent",
    customZIndex: 50
}
type DefaultProps = Partial<typeof defaultProps>;
type BackgroundBlockerProps = {
    onClick: () => void
} & DefaultProps;

function BackgroundBlocker(props: BackgroundBlockerProps) {
    const style: CSSProperties = {
        backgroundColor: props.backgroundColor,
        zIndex: props.customZIndex
    }

    return (<>
        <div className="click-blocker" style={style} onClick={props.onClick}></div>
    </>)
}

BackgroundBlocker.defaultProps = defaultProps;

export default BackgroundBlocker;