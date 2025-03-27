import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router";
import {FindActivitiesPeriodEnum} from "../../../api";
import {formatTime} from "../../../utils/format-time";
import {ActivitiesChartBar} from "../../components/activities-chart-bar";
import {ActivitiesChartPie} from "../../components/activities-chart-pie";
import {useAppDispatch} from "../../store/hooks/use-app-dispatch";
import {selectActivities} from "../../store/selectors";
import {getActivities} from "../../store/slices/activities-slice";

const NEUTRAL = "Нейтральная";
const PRODUCTIVE = "Полезная";
const DISTRUCTING = "Отвлекающяя";

export const ReportPage = () => {
  const [searchParams] = useSearchParams();
  const appDispatch = useAppDispatch();
  const {activities} = useSelector(selectActivities);

  useEffect(() => {
    const period = searchParams.get('period') as FindActivitiesPeriodEnum;
    const startDate = searchParams.get('startDate') ?? '';
    const endDate = searchParams.get('endDate') ?? '';

    appDispatch(getActivities({
      period,
      startDate,
      endDate
    }));
  }, [searchParams, appDispatch]);
  
  const mappedActivitiesObject = activities.reduce((acc, item) => {

    if (item.resource.category?.type === 'productive'){
      acc[PRODUCTIVE] += item.timeSpent;
    } else if (item.resource.category?.type === 'distracting'){
      acc[DISTRUCTING] += item.timeSpent;
    }else{
      acc[NEUTRAL] += item.timeSpent;
    }

    return acc;
  }, {
    [DISTRUCTING]: 0,
    [NEUTRAL]: 0,
    [PRODUCTIVE]: 0
  });
  const mappedActivities = Object.values(mappedActivitiesObject).map((value, index) => ({
    id: index,
    value,
    label: Object.keys(mappedActivitiesObject)[index]
  }));
  // const barsChartData = activities?.reduce((acc, item) => {
  //   const {uri} = item.resource;

  //   acc[uri] = (acc[uri] || 0) + item.timeSpent;

  //   return acc;
  // }, {});

  useEffect(() => {
    appDispatch(getActivities());
  }, []);

  return (
    <div>
      {Object.entries(mappedActivitiesObject).map(([key, value], index) =>
        <p key={index}>{key}: {formatTime(value, 'ms')}</p>)}
      
      <ActivitiesChartPie activities={mappedActivities} />
      {/* <ActivitiesChartBar activities={barsChartData} /> */}
    </div>
  );
};