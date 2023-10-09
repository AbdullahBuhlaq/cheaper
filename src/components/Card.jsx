import React, { useState } from "react";
import "../css/Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import LoadingChart from "./LoadingChart";
import Loading from "../interfaces/general/Loading";
import { FcCancel } from "react-icons/fc";
import checkPermissions from "../functions/checkPermission";
import SuspendChart from "./SuspendChart";

const Card = (props) => {
  try {
    return <>{props.expanded == props.index ? <ExpandedCard param={props} /> : <CompactCard param={props} />}</>;
  } catch (err) {
    console.log(err);
  }
};

// Compact Card
function CompactCard({ param }) {
  const Png = param.png;
  try {
    return (
      <motion.div
        className="CompactCard"
        style={
          {
            // background: param.color.backGround,
            // boxShadow: param.color.boxShadow,
          }
        }
        layoutId={"expandableCard" + param.index}
        onClick={() => param.setExpanded(param.index)}
        layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* <div className="chartIcon">
          
        </div> */}
        {!checkPermissions(param.userInformation, ["admin.home.getCount"]) ? (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "30px" }}>
                <FcCancel />
              </span>
              <span style={{ fontSize: "15px" }}>لا تملك صلاحية</span>
            </div>
          </>
        ) : param.loading ? (
          <Loading />
        ) : (
          <CircularProgressbar value={param.barValue} text={param.value.toString()} />
        )}
        {/* <CircleChart percentage={param.barValue} color={"blue"} /> */}
        <span>
          {param.title} <Png />
        </span>

        {/* <div className="detail">
          <Png />
          <span>
            {param.loading ? "loading" : param.value}
            <i>{param.unit}</i>
          </span>
          <span>اخر شهر</span>
        </div> */}
      </motion.div>
    );
  } catch (err) {
    console.log(err);
  }
}

// Expanded Card
function ExpandedCard({ param }) {
  try {
    return (
      <motion.div
        className="ExpandedCard"
        style={{
          // background: param.color.backGround,
          // boxShadow: param.color.boxShadow,
          zIndex: 70,
        }}
        layoutId={"expandableCard" + param.index}
        layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
          <UilTimes onClick={() => param.setExpanded(false)} />
        </div>
        <span>{param.title}</span>
        <div className="chartContainer">{!checkPermissions(param.userInformation, [param.index == 1 ? "admin.home.chartUsers" : param.index == 2 ? "admin.home.chartStores" : "admin.home.cartChart"]) ? <SuspendChart /> : param.loading ? <LoadingChart /> : <Chart options={param.options} series={param.series} categories={param.categories} type="area" />}</div>
        <span>كل الأشهر</span>
      </motion.div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Card;
