/*
 * SPDX-FileCopyrightText: Copyright (c) 2024 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-NvidiaProprietary
 *
 * NVIDIA CORPORATION, its affiliates and licensors retain all intellectual
 * property and proprietary rights in and to this material, related
 * documentation and any modifications thereto. Any use, reproduction,
 * disclosure or distribution of this material and related documentation
 * without an express license agreement from NVIDIA CORPORATION or
 * its affiliates is strictly prohibited.
 */

import React from "react";
import './App.css';
import './Hidden.css'; // Assuming you're using existing styles

interface HiddenProps {
    width: number;
    isEnabled: boolean;
    onToggle: (value: boolean) => void;
}

interface HiddenState {
    selected: boolean;
}

export default class Hidden extends React.Component<HiddenProps, HiddenState> {
    constructor(props: HiddenProps) {
        super(props);
        this.state = {
            selected: props.isEnabled
        };
    }

    componentDidUpdate(prevProps: HiddenProps) {
        if (prevProps.isEnabled !== this.props.isEnabled) {
            this.setState({ selected: this.props.isEnabled });
        }
    }

    private _handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        this.setState({ selected: newValue });
        this.props.onToggle(newValue);
    };

    render() {
        return (
            <div className="hiddenContainer" style={{ width: this.props.width }}>
                <div className="hiddenHeader">
                    {'Hidden'}
                </div>
                <div className="hiddenSelectorContainer">
                    <label className="hiddenOption">
                        <input
                            type="checkbox"
                            checked={this.state.selected}
                            onChange={this._handleToggle}
                        />
                        {this.state.selected ? 'On' : 'Off'}
                    </label>
                </div>
            </div>
        );
    }
}