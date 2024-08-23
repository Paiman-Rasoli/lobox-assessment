import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";
import { dropDownDataSet } from "../../data";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

function DropDown() {
  const [newItemValue, setNewItemValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>(dropDownDataSet);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewItemValue(e.target.value);
      setIsDropdownVisible(true);
    },
    []
  );

  const handleAddItem = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && newItemValue) {
        if (!items.includes(newItemValue)) {
          setItems([...items, newItemValue]);
        }
        setNewItemValue("");
        setIsDropdownVisible(false);
      }
    },
    [newItemValue]
  );

  const handleSelectItem = useCallback((item: string) => {
    setNewItemValue(item);
    setIsDropdownVisible(false);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsDropdownVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-parent" ref={dropdownRef}>
      <input
        type="text"
        value={newItemValue}
        onChange={handleInputChange}
        onKeyDown={handleAddItem}
        onFocus={handleOnFocus}
        placeholder="Type or select an item"
        className={isDropdownVisible ? "dropdown-visible" : ""}
      />
      <span
        className="arrow"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        {isDropdownVisible ? (
          <FaChevronUp color="gray" />
        ) : (
          <FaChevronDown color="gray" />
        )}
      </span>

      {isDropdownVisible && (
        <ul className="dropdown-menu">
          {items
            .filter((item) => item.includes(newItemValue))
            .map((item, index) => (
              <li
                key={`option-${index}`}
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
