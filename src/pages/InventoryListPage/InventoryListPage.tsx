import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";

//Style
import Styles from "./InventoryListPage.module.scss";

//Components
import { StatsCard } from "../../components/stats-card/StatsCard";

//Asset
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import { ReactComponent as DollarIcon } from "../../assets/dollar.svg";
import { ReactComponent as OutOfStockIcon } from "../../assets/out-of-stock.svg";
import { ReactComponent as CategoryIcon } from "../../assets/category-icon.svg";

import { formatNumber } from "../../methods/formatNumber";
import DataTable from "../../components/data-table/DataTable";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProduct,
    editInventoryItem,
    enableOrDisableProduct,
    fetchInventoryData,
} from "../../store/inventorySlice";
import { AppDispatch, RootState } from "../../store";
import { InventoryListType } from "../../store/types";
import InventoryEditForm from "./inner-components/InventoryEditForm/InventoryEditForm";
import IconWrapper from "../../components/IconWrapper/IconWrapper";

const InventoryListPage = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState<InventoryListType>({
        name: "sa",
        category: "sa",
        price: "10",
        quantity: 10,
        value: "12",
    });

    const dispatch: AppDispatch = useDispatch();

    const { items, loading } = useSelector(
        (state: RootState) => state.inventory
    );

    const { userView } = useSelector(
        (state: RootState) => state.roleManagement
    );

    const handleEditItem = (data: InventoryListType) => {
        dispatch(
            editInventoryItem({
                name: data.name,
                changes: {
                    ...data,
                },
            })
        );
        setShowEditModal(false);
    };

    const generateAggregatedStatInfo = useMemo(() => {
        const accumulatedData = items.reduce(
            (acc, { value, quantity, category, isEditable }) => {
                if (!isEditable) return acc;
                acc.total_products_available += 1;
                acc.total_store_value +=
                    parseFloat(value.replace("$", "")) || 0;
                if (quantity === 0) acc.products_not_available++;
                if (!acc.categories.includes(category))
                    acc.categories.push(category);
                return acc;
            },
            {
                total_products_available: 0,
                total_store_value: 0,
                products_not_available: 0,
                categories: [],
            }
        );

        return [
            {
                label: "Total products",
                count: accumulatedData.total_products_available,
                icon: (
                    <IconWrapper width={20} height={20}>
                        <CartIcon />
                    </IconWrapper>
                ),
            },
            {
                label: "Total store value",
                count: formatNumber(accumulatedData.total_store_value),
                icon: (
                    <IconWrapper width={20} height={20}>
                        {" "}
                        <DollarIcon />
                    </IconWrapper>
                ),
            },
            {
                label: "Out of stocks",
                count: accumulatedData.products_not_available,
                icon: (
                    <IconWrapper width={20} height={20}>
                        <OutOfStockIcon />
                    </IconWrapper>
                ),
            },
            {
                label: "No of Category",
                count: accumulatedData.categories.length,
                icon: (
                    <IconWrapper width={20} height={20}>
                        <CategoryIcon />
                    </IconWrapper>
                ),
            },
        ];
    }, [items]);

    useEffect(() => {
        dispatch(fetchInventoryData());
    }, [dispatch]);
    return (
        <div className={classNames("container-fluid", Styles.listPageWrapper)}>
            <h1 className="text-white mb-0">Inventory stats</h1>

            <div className={Styles.statsCardContainer}>
                {generateAggregatedStatInfo.map((stat, index) => {
                    return (
                        <StatsCard
                            key={index}
                            label={stat.label}
                            count={stat.count}
                            icon={stat.icon}
                        />
                    );
                })}
            </div>

            <div className={Styles.inventoryListContainer}>
                <DataTable
                    // columnNames={[
                    //     "Custom header Name",
                    //     "Category",
                    //     "Price",
                    //     "quantity",
                    //     "value",
                    // ]}
                    skipColumns={["isEditable"]}
                    data={items}
                    loading={loading}
                    enableActions
                    viewOnly={userView}
                    onClickEdit={(val) => {
                        setSelectedData(val);
                        setShowEditModal(true);
                    }}
                    onClickView={(val) => {
                        dispatch(
                            enableOrDisableProduct({
                                name: val.name,
                                changes: val,
                            })
                        );
                    }}
                    onClickDelete={(val) => {
                        dispatch(
                            deleteProduct({
                                name: val.name,
                                changes: val,
                            })
                        );
                    }}
                />
            </div>

            {/* Edit modal */}
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered
                contentClassName="bg-dark"
            >
                <InventoryEditForm
                    data={selectedData}
                    onSubmit={handleEditItem}
                    onCancel={() => setShowEditModal(false)}
                />
            </Modal>
        </div>
    );
};

export default InventoryListPage;
