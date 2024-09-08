import React from 'react';
import "./Standing.css"
const Standing = () => {
    return (
        <div class="primary-filter">
            <div class="primary-filter__filter-container">
                <div class="primary-filter__filter-label">Year</div>
                <select class="primary-filter__filter-select primary-filter__filter-select--year">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div class="primary-filter__filter-container">
                <div class="primary-filter__filter-label">Championship</div>
                <select class="primary-filter__filter-select primary-filter__filter-select--year">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div class="primary-filter__filter-container">
                <div class="primary-filter__filter-label">Category</div>
                <select class="primary-filter__filter-select primary-filter__filter-select--year">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
            </div>
        </div>
    )
}
export default Standing;