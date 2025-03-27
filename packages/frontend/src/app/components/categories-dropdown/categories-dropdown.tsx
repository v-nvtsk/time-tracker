import {
  MenuItem, Select,
  SelectChangeEvent
} from "@mui/material";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useState} from "react";
import {
  CategorySuccessResponse,
  ResourceSuccessResponse
} from "../../../api";

interface CategoriesDropdownParams {
  params: GridRenderCellParams<ResourceSuccessResponse, CategorySuccessResponse>,
  categories: CategorySuccessResponse[];
  categoryChangeHandler: (resource: ResourceSuccessResponse, newCategoryId: number) => void
}

export const CategoriesDropdown = ({
  params, categories, categoryChangeHandler
}: CategoriesDropdownParams) => {
  const [selected, setSelected] = useState(params.row.category?.id || 0);
  const changeHandler = (event: SelectChangeEvent<number>) => {
    categoryChangeHandler(params.row, Number(event.target.value));
    setSelected(Number(event.target.value));
  };

  return (
    <Select
      sx={{
        width: '100%',
        height: '100%'
      }}
      value={selected}
      onChange={changeHandler}>
      {!params.row.category?.id && <MenuItem value={0}>Без категории</MenuItem>}

      {categories.map((category) => (
        <MenuItem
          key={category.id} value={category.id}
          contentEditable={false}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );
};