import React from "react";
import Styles from "./StatsCard.module.scss";

interface StatsCardProps {
    label: string | React.ReactNode;
    count: number | string;
    icon: React.ReactNode;
}

export const StatsCard = ({ label, count, icon }: StatsCardProps) => {
    return (
        <div className={Styles.StatsCard}>
            <div className={Styles.iconWrapper}>{icon}</div>
            <div className={Styles.StatsCardContent}>
                <span className={Styles.label}>{label}</span>
                <span className={Styles.StatCount}>{count}</span>
            </div>
        </div>
    );
};
