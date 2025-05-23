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
import './LightingOptions.css';


interface LightingOptionsProps {
    width: number;
    lightingOptions: string[];
    selectedLighting: string;
    onSelectLighting: (asset: string) => void;
}

interface LightingOptionsState {
    selectedLightingOptionsIndex: number | null;
}

export default class LightingOptions extends React.Component<LightingOptionsProps, LightingOptionsState> {
    constructor(props: LightingOptionsProps) {
        super(props);
        // Initialize state with the index of the asset matching the initial URL if provided
        this.state = {
            selectedLightingOptionsIndex: 0
        };
    }
    
    /**
    * @function _handleSelectChange
    *
    * Handle selection in list.
    */
    _handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(event.target.value, 10);
        this.setState({ selectedLightingOptionsIndex: selectedIndex });
        if (this.props.onSelectLighting) {
            this.props.onSelectLighting(this.props.lightingOptions[selectedIndex]);
        }
    };
    
    /**
    * @function componentDidUpdate
    *
    * Update state if the selectedAssetUrl prop changes.
    */
    componentDidUpdate(prevProps: LightingOptionsProps) {
        if (prevProps.selectedLighting !== this.props.selectedLighting) {
            const newIndex = this._findLightingIndex(this.props.selectedLighting);
            if (newIndex !== this.state.selectedLightingOptionsIndex) {
                this.setState({ selectedLightingOptionsIndex: newIndex });
            }
        }
    }
    
    /**
    * @function _findAssetIndexByUrl
    *
    * Find index of asset by url.
    */
    private _findLightingIndex (val: string): number {
        return this.props.lightingOptions.findIndex(option => val === option);
    }
    
    /**
    * @function _renderSelector
    *
    * Render the selector.
    */
    private _renderSelector (): JSX.Element {
          const options = this.props.lightingOptions.map((option, index) => (
              <option key={index} value={index} className="lightingOptionsOption">
                  {option}
              </option>
          ));

          return (
              <select
                  className="nvidia-dropdown"
                  onChange={this._handleSelectChange}
                  value={this.state.selectedLightingOptionsIndex || ''}>
                  {options}
              </select>
          );
    }
    
    render() {
          return (
              <div className="lightingOptionsContainer" style={{ width: this.props.width }}>
                  <div className="lightingOptionsHeader">
                      {'Lighting Options'}
                  </div>
                  <div className="lightingOptionsSelectorContainer">
                      {this._renderSelector()}
                  </div>
              </div>

          );
    }
}
