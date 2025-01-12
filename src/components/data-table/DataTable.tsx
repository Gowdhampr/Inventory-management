import React from "react";
import classNames from "classnames";

//Style
import Styles from "./DataTable.module.scss";

//Icons
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as ViewIcon } from "../../assets/view-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import IconWrapper from "../IconWrapper/IconWrapper";

export interface DataTableProps<T extends { isEditable?: boolean }> {
    columnNames?: String[];
    skipColumns?: String[];
    data: T[];
    loading?: boolean;
    enableActions?: boolean;
    viewOnly?: boolean;
    onClickEdit?: (val: T) => void;
    onClickView?: (val: T) => void;
    onClickDelete?: (val: T) => void;
}

const DataTable = <T extends { isEditable?: boolean }>({
    columnNames,
    data,
    loading = true,
    enableActions = false,
    onClickEdit,
    onClickView,
    onClickDelete,
    skipColumns,
    viewOnly,
}: DataTableProps<T>) => {
    return (
        <div
            className={classNames(
                Styles.DataTableContainer,
                "table-responsive card bg-dark"
            )}
        >
            {loading ? (
                <div className="d-flex justify-content-center bg-dark p-4">
                    <div className="spinner-border text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : Array.isArray(data) && data.length ? (
                <table
                    className={classNames(
                        Styles.dataTable,
                        "table table-dark mb-0"
                    )}
                >
                    <thead>
                        <tr>
                            {columnNames && columnNames.length
                                ? columnNames.map((colName, index) => (
                                      <th scope="col" key={index}>
                                          <span
                                              className={classNames(
                                                  Styles.tableHeader
                                              )}
                                          >
                                              {colName}
                                          </span>
                                      </th>
                                  ))
                                : Object.keys(data[0])
                                      .map(
                                          (key) =>
                                              key.charAt(0).toUpperCase() +
                                              key.slice(1)
                                      )
                                      .map((colName, index) => {
                                          if (
                                              skipColumns.some(
                                                  (item) =>
                                                      item.toLowerCase() ===
                                                      colName.toLowerCase()
                                              )
                                          )
                                              return <></>;
                                          return (
                                              <th scope="col" key={index}>
                                                  <span
                                                      className={classNames(
                                                          Styles.tableHeader
                                                      )}
                                                  >
                                                      {colName}
                                                  </span>
                                              </th>
                                          );
                                      })}
                            {enableActions ? (
                                <th scope="col">
                                    <span
                                        className={classNames(
                                            Styles.tableHeader
                                        )}
                                    >
                                        Action
                                    </span>
                                </th>
                            ) : (
                                <></>
                            )}
                        </tr>
                    </thead>
                    <tbody className={viewOnly ? Styles.disable : ""}>
                        {data.map((val, i) => {
                            const rowData = skipColumns.length
                                ? Object.entries(val)
                                      .filter(
                                          ([key, value]) =>
                                              !skipColumns.includes(key)
                                      )
                                      .map(([key, value]) => value)
                                : Object.values(val);

                            const disableAction = !val.isEditable;

                            return (
                                <tr key={i}>
                                    {rowData.map((rval, index) => {
                                        return <td key={index}>{rval}</td>;
                                    })}
                                    {enableActions ? (
                                        <td>
                                            <div
                                                className={
                                                    Styles.actionIconWrapper
                                                }
                                            >
                                                <IconWrapper
                                                    height={15}
                                                    width={15}
                                                    svgfillcolor={
                                                        disableAction
                                                            ? "grey"
                                                            : "#326923"
                                                    }
                                                    onClick={() =>
                                                        disableAction
                                                            ? {}
                                                            : onClickEdit(val)
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconWrapper>

                                                <IconWrapper
                                                    height={20}
                                                    width={20}
                                                    svgfillcolor="#B58CC3"
                                                    onClick={() =>
                                                        onClickView(val)
                                                    }
                                                >
                                                    <ViewIcon />
                                                </IconWrapper>

                                                <IconWrapper
                                                    height={15}
                                                    width={15}
                                                    svgfillcolor="red"
                                                    onClick={() =>
                                                        disableAction
                                                            ? {}
                                                            : onClickDelete(val)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconWrapper>
                                            </div>
                                        </td>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <>
                    <p className="text-white text-center mt-3">
                        No data available
                    </p>
                </>
            )}
        </div>
    );
};

export default DataTable;
