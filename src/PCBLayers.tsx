import React from "react";
import './App.css';
import './PCBLayers.css';

interface PCBLayersProps {
    width: number;
    layerNames: string[];
    enabledStates: boolean[];
    onToggle: (index: number, value: boolean) => void;
}

interface PCBLayersState {
    selected: boolean[];
}

export default class PCBLayers extends React.Component<PCBLayersProps, PCBLayersState> {
    constructor(props: PCBLayersProps) {
        super(props);
        this.state = {
            selected: props.enabledStates.slice()
        };
    }

    componentDidUpdate(prevProps: PCBLayersProps) {
        // Update state if enabledStates prop changes
        if (prevProps.enabledStates !== this.props.enabledStates) {
            this.setState({ selected: this.props.enabledStates.slice() });
        }
    }

    private _handleToggle = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        const updatedSelected = [...this.state.selected];
        updatedSelected[index] = newValue;
        this.setState({ selected: updatedSelected });
        this.props.onToggle(index, newValue);
    };

render() {
    return (
        <div className="pcbLayersContainer" style={{ width: this.props.width }}>
            <div className="pcbLayersHeader">
                {'PCB Layers'}
            </div>
            <div className="pcbLayersSelectorContainer">
                {this.props.layerNames.map((name, idx) => (
                    <div className="pcbLayersOption" key={name} style={{ marginBottom: 8 }}>
                        <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <span style={{ flex: 1 }}>{name}</span>
                            <input
                                type="checkbox"
                                checked={!!this.state.selected[idx]}
                                onChange={this._handleToggle(idx)}
                                style={{ marginRight: 8 }}
                            />
                            {this.state.selected[idx] ? 'On' : 'Off'}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
}