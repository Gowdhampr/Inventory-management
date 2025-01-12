import React from "react";
import Styles from "./NavBar.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { toggleView } from "../../store/roleManagementSlice";

const NavBar = () => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div className="d-flex justify-content-end">
            <div
                className={`${Styles.toggleViewWrapper} d-flex align-items-center me-2`}
            >
                <span className="text-white me-2">admin</span>
                <div className="form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={(e) => {
                            dispatch(toggleView(e.target.checked));
                        }}
                    />
                </div>
                <span className="text-white ml-5">user</span>
            </div>
        </div>
    );
};

export default NavBar;
