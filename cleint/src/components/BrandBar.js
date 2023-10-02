import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Dropdown, Button } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectBrand = (brand) => {
        device.setSelectedBrand(brand);
        setIsOpen(false);
    };

    const clearFilter = () => {
        device.setSelectedBrand({});
        setIsOpen(false);
    };

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown} className="list-group" style={{marginTop:'1em'}}>
            <Dropdown.Toggle variant="success" id="brand-dropdown">
                {device.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map((brand) => (
                    <Dropdown.Item
                        key={brand.id}
                        onClick={() => selectBrand(brand)}
                        active={brand.id === device.selectedBrand.id}
                    >
                        {brand.name}
                    </Dropdown.Item>
                ))}
                <Dropdown.Item onClick={clearFilter}>Очистить</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default BrandBar;
