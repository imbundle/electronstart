import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/route.reducers";
import { getSysInfo } from "../redux/store/sysinfo/sysFetch";

const SysInfoContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { info } = useSelector((state: RootState) => state.sysInfo);

  useEffect(() => {
    async function init() {
      dispatch(getSysInfo());
    }
    init();
  }, []);

  console.log("conteiner", info);
  return <h1>{info?.kernel}</h1>;
};

export default SysInfoContainer;
