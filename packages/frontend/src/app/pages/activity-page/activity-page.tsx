import {useAppDispatch} from "@app/store/hooks";
import {selectActivities} from "@app/store/selectors";
import {
  getActivities, updateActivity
} from "@app/store/slices/activities-slice";
import {
  Box, Tooltip
} from '@mui/material';
import {
  DataGrid, GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  useCallback, useEffect,
} from "react";
import {useSelector} from "react-redux";
import {useSearchParams} from 'react-router';
import {
  ActivitySuccessResponse,
  FindActivitiesPeriodEnum
} from '@/api';
import {formatDate} from '@/utils/format-date';
import {formatTime} from "@/utils/format-time";

export function ActivityPage() {
  const appDispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const {
    isLoading: isActivitiesLoading, activities
  } = useSelector(selectActivities);

  useEffect(() => {
    if (!isActivitiesLoading){
      const period = searchParams.get('period') as FindActivitiesPeriodEnum;
      const startDate = searchParams.get('startDate') ?? '';
      const endDate = searchParams.get('endDate') ?? '';

      appDispatch(getActivities({
        period,
        startDate,
        endDate
      }));
    }
  }, [searchParams, appDispatch]);

  const columns: GridColDef<ActivitySuccessResponse>[] = [
    {
      field: 'createdAt',
      headerName: 'Дата',
      description: 'Дата создания активности',
      width: 200,
      
      valueGetter: (value:string):Date => new Date(value),
      renderCell: (params: GridRenderCellParams<ActivitySuccessResponse, Date>) => (
        <Tooltip title={params.value?.toString() || ''}>
          <span className="table-cell-trucate">{formatDate(params.value)}</span>
        </Tooltip>),
      type: 'date',
      filterable: true
    },
    {
      field: 'timeSpent',
      headerName: 'Длит.',
      description: 'Длительность активности в формате чч:мм:сс',
      type: 'number',
      editable: false,
      valueGetter: (value) => value,
      renderCell: (params: GridRenderCellParams<ActivitySuccessResponse>) => formatTime(params?.value || 0)
    },
    {
      field: 'uri',
      headerName: 'Идентификатор ресурса',
      description: 'Идентификатор ресурса: адрес веб-сайта, название приложения',
      valueGetter: (_, row) => row.resource.uri,

      flex: 1,
      editable: false,
      filterable: true
    },
    {
      field: 'category',
      headerName: 'Категория',
      width: 250,
      editable: false,
      valueGetter: (_, row) => row.resource.category?.name || 'Без категории',
    },
    {
      field: 'type',
      headerName: 'Тип ресурса',
      width: 250,
      editable: false,
      valueGetter: (_, row) => row.resource.category?.type || '',
    },
    {
      field: 'description',
      headerName: 'Описание',
      flex: 1,
      editable: true,
    },
  ];
  const handleRowUpdate = useCallback((newRow: ActivitySuccessResponse, oldRow: ActivitySuccessResponse) => {
    if (oldRow.description !== newRow.description){
      appDispatch(updateActivity({
        id: newRow.id,
        description: newRow.description,
      }));
    }

    return newRow;
  }, [appDispatch]);

  return (
    <>
      <h2>Activity page</h2>

      <Box sx={{
        minHeight: 800,
        width: '100%',
        flexGrow: 1
      }}>
        <DataGrid
          loading={isActivitiesLoading}
          rows={activities}
          columns={columns}
          editMode="row"
          density="comfortable"
          pageSizeOptions={[10, 25, 50, 100, {
            value: -1,
            label: 'Все'
          }]}
          initialState={{
            pagination: {paginationModel: {
              pageSize: 10,
              page: 0,
            },},
            sorting: {sortModel: [{
              field: 'createdAt',
              sort: 'asc'
            }],},
          }}
          processRowUpdate={handleRowUpdate}/>
      </Box>
    </>
  );
}
