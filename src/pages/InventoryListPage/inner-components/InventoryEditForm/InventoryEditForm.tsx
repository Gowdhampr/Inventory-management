import React, { useState } from "react";
import { InventoryListType } from "../../../../store/types";
import Input from "../../../../components/input/Input";
import classNames from "classnames";
import { Button } from "react-bootstrap";

import Styles from "./InventoryEditForm.module.scss";

import { ReactComponent as CrossIcon } from "../../../../assets/cross-icon.svg";
import IconWrapper from "../../../../components/IconWrapper/IconWrapper";

interface InventoryEditFormProps {
    data: InventoryListType;
    onSubmit: (data: InventoryListType) => void;
    onCancel: () => void;
}

const InventoryEditForm = ({
    data,
    onCancel,
    onSubmit,
}: InventoryEditFormProps) => {
    const [updatedData, setUpdatedData] = useState(data);
    const [errorMessage, setErrorMessage] = useState({
        category: "",
        price: "",
        quantity: "",
        value: "",
    });

    const handleChangeInput = (e) => {
        // For simplicity i've giving same name as of key
        if (e.target.value !== "") {
            let prefix =
                e.target.name === "value" || e.target.name === "price"
                    ? "$"
                    : "";
            setUpdatedData((prevVal) => ({
                ...prevVal,
                [e.target.name]: prefix + e.target.value,
            }));
            setErrorMessage((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        } else {
            setUpdatedData((prevVal) => ({
                ...prevVal,
                [e.target.name]: "",
            }));
            setErrorMessage((prev) => ({
                ...prev,
                [e.target.name]: e.target.name + " can't be empty!",
            }));
        }
    };

    const renderError = (errMsg: string) => {
        return <span className="text-danger">{errMsg}</span>;
    };

    return (
        <div className={classNames(Styles.main, "container")}>
            <div className={Styles.headerContainer}>
                <div className={Styles.titleContainer}>
                    <h2 className="text-white">Edit product</h2>
                    <h6>{updatedData.name}</h6>
                </div>
                <div className={Styles.closeBtnContainer}>
                    <IconWrapper
                        svgfillcolor="#b6d04c"
                        strokeColor="#b6d04c"
                        width={20}
                        height={20}
                        onClick={onCancel}
                    >
                        <CrossIcon />
                    </IconWrapper>
                </div>
            </div>
            <div className={classNames(Styles.inputContainer)}>
                <div className={classNames(Styles.fieldWrapper)}>
                    <Input
                        id="Category"
                        name={"category"}
                        type="text"
                        label="Category"
                        value={updatedData.category}
                        onChange={handleChangeInput}
                    />
                    {renderError(errorMessage.category)}
                </div>
                <div className={classNames(Styles.fieldWrapper)}>
                    <Input
                        id="price"
                        name={"price"}
                        type="text"
                        label="price"
                        value={updatedData.price.replace("$", "")}
                        onChange={handleChangeInput}
                    />
                    {renderError(errorMessage.price)}
                </div>
                <div className={classNames(Styles.fieldWrapper)}>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="text"
                        label="quantity"
                        value={updatedData.quantity}
                        onChange={handleChangeInput}
                    />
                    {renderError(errorMessage.quantity)}
                </div>
                <div className={classNames(Styles.fieldWrapper)}>
                    <Input
                        id="value"
                        name="value"
                        type="text"
                        label="value"
                        value={updatedData.value.replace("$", "")}
                        onChange={handleChangeInput}
                    />
                    {renderError(errorMessage.value)}
                </div>
            </div>

            <div className={Styles.btnWrapper}>
                <Button
                    className={Styles.cancelBtn}
                    variant="link"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    className={Styles.submitBtn}
                    variant="secondary"
                    onClick={() => onSubmit(updatedData)}
                    disabled={
                        !!errorMessage.category ||
                        !!errorMessage.price ||
                        !!errorMessage.quantity ||
                        !!errorMessage.value
                    }
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default InventoryEditForm;
