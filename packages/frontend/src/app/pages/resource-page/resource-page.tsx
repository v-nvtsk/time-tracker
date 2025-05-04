import DeleteIcon from '@mui/icons-material/Delete';
import {Box} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef
  , GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  useCallback,
  useEffect, useMemo,
  useState
} from "react";
import {useSelector} from "react-redux";
import {
  CategorySuccessResponse, ResourceSuccessResponse
} from "../../../api";
import {CategoriesDropdown} from "../../components/categories-dropdown";
import {ApproveDialog} from '../../components/dialog/dialog';
import {useAppDispatch} from "../../store/hooks/use-app-dispatch";
import {
  selectCategories, selectResources
} from "../../store/selectors";
import {getCategories} from "../../store/slices/categories-slice";
import {
  deleteResource,
  getResources, updateResource
} from "../../store/slices/resources-slice";

export const ResourcePage = () => {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<ResourceSuccessResponse | null>(null);
  const appDispatch = useAppDispatch();
  const {
    items, isLoading: isResourcesLoading
  } = useSelector(selectResources);
  const {
    categories, isLoading: isCategoriesLoading
  } = useSelector(selectCategories);
  //
  const categoryChangeHandler = useCallback((resource: ResourceSuccessResponse, newCategoryId: number) => {
    appDispatch(updateResource({
      uri: resource.uri,
      categoryId: newCategoryId
    }));
  }, [appDispatch]);
  //
  const deleteResourceHandler = useCallback((resourceId: number) => {
    appDispatch(deleteResource(resourceId));
    setIsApproveDialogOpen(false);
  }, [appDispatch]);

  useEffect(() => {
    appDispatch(getCategories());
    if (!isResourcesLoading && !isCategoriesLoading){
      
      appDispatch(getResources());
    }
  }, []);

  const columns: GridColDef<ResourceSuccessResponse>[] = useMemo(() => ([
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'uri',
      headerName: 'Название',
      flex: 2
    },
    {
      field: 'category',
      headerName: 'Категория',
      flex: 2,
      editable: false,
      renderCell: (params: GridRenderCellParams<ResourceSuccessResponse, CategorySuccessResponse>) => {
        return <CategoriesDropdown
          params={params}
          categories={categories}
          categoryChangeHandler={categoryChangeHandler} />;
      },
    },
    {
      field: 'actions',
      type: "actions",
      getActions: (params) => ([
        <GridActionsCellItem
          key="delete"
          onClick={() => {
            setResourceToDelete(params.row);
            setIsApproveDialogOpen(true);
          }}
          icon={<DeleteIcon />}
          label="Edit"
        />,
      ])
    },

  ]), [items]);

  return (
    <>
      <h2>Resources page</h2>

      {!isResourcesLoading && <Box sx={{
        minHeight: 800,
        width: '100%',
        flexGrow: 1
      }}>
        <DataGrid
          loading={isCategoriesLoading || isResourcesLoading}
          rows={items}
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
              field: 'id',
              sort: 'asc'
            }],},
          }}
        />
      </Box>
      }
      <ApproveDialog
        open={isApproveDialogOpen}
        handleClose={() => setIsApproveDialogOpen(false)}
        handleApprove={() => deleteResourceHandler(resourceToDelete!.id)}
        title="Подтверждение удаления" description={`Вы действительно хотите удалить ресурс?: ${resourceToDelete?.uri}`} />
    </>
  );
};
