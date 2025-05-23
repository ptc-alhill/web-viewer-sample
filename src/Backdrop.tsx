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
import './LightingOptions.css'; // Assuming you're using existing styles

interface BackdropProps {
    width: number;
    isEnabled: boolean;
    onToggle: (value: boolean) => void;
}

interface BackdropState {
    selected: boolean;
}

export default class Backdrop extends React.Component<BackdropProps, BackdropState> {
    constructor(props: BackdropProps) {
        super(props);
        this.state = {
            selected: props.isEnabled
        };
    }

    componentDidUpdate(prevProps: BackdropProps) {
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
            <div className="lightingOptionsContainer" style={{ width: this.props.width }}>
                <div className="lightingOptionsHeader">
                    {'Backdrop'}
                </div>
                <div className="lightingOptionsSelectorContainer">
                    <label className="lightingOptionsOption">
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