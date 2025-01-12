import classNames from "classnames";
import React from "react";
import Form from "react-bootstrap/Form";
import { FormControlProps } from "react-bootstrap";

import Styles from "./Input.module.scss";

interface InputProps extends FormControlProps {
    id?: string;
    type: "text" | "number";
    label?: string;
}

const Input = ({ type, id, label, ...props }: InputProps) => {
    return (
        <>
            {label ? (
                <Form.Label
                    htmlFor={"input" + type + id}
                    className={classNames(Styles.inputLabel)}
                    as={"span"}
                >
                    {label}
                </Form.Label>
            ) : (
                <></>
            )}
            <Form.Control
                type={type}
                id={"input" + type + id}
                className={classNames(Styles.inputField, "border-0 mt-2")}
                {...props}
            />
        </>
    );
};

export default Input;
