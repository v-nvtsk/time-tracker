import {Box} from "@mui/material";
import {PieChart} from '@mui/x-charts';

const chartHeight = 200;
const innerCircleRadius = '70%';

export const ActivitiesChartPie = ({activities}: {activities: {
  id: number;
  value: number;
  label: string;
}[]}) => {

  return (
    <Box sx={{width: '100%'}}>
      <PieChart
        skipAnimation
        colors={['red', 'gray', 'green']}
        series={[
          {
            data: activities,
            innerRadius: innerCircleRadius,
          }
        ]}
        height={chartHeight} />
    </Box>
  );
};
