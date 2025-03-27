import {useEffect} from "react";
import {useSelector} from "react-redux";
import {formatTime} from "../../../utils/format-time";
import {ActivitiesChartPie} from "../../components/activities-chart-pie";
import {useAppDispatch} from "../../store/hooks/use-app-dispatch";
import {selectActivities} from "../../store/selectors";
import {getActivities} from "../../store/slices/activities-slice";

const NEUTRAL = "Нейтральная";
const PRODUCTIVE = "Полезная";
const DISTRUCTING = "Отвлекающяя";

export const MainPage = () => {

  const appDispatch = useAppDispatch();
  const {activities} = useSelector(selectActivities);

  useEffect(() => {
    appDispatch(getActivities());
  }, [appDispatch]);
  
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

  return (
    <>
      <p>Здесь будет отчёт за сегодня...</p>
      <p>А пока отчёт за всё время:</p>
      {Object.entries(mappedActivitiesObject).map(([key, value], index) =>
        <p key={index}>{key}: {formatTime(value, 'ms')}</p>)}
      
      <ActivitiesChartPie activities={mappedActivities} />
    </>
  );
};