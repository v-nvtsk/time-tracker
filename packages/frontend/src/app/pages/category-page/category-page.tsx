import {useAppDispatch} from "@app/store/hooks/use-app-dispatch";
import {selectCategories} from "@app/store/selectors";
import {
  createCategory, getCategories,
  initDefaultCategories,
  updateCategory
} from "@app/store/slices/categories-slice";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  useEffect, useState
} from "react";
import {useSelector} from "react-redux";
import {
  CategorySuccessResponse, CategorySuccessResponseTypeEnum
} from "../../../api";

export function CategoryPage() {
  const appDispatch = useAppDispatch();
  const {
    isLoading, categories
  } = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<CategorySuccessResponse | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState<
    CategorySuccessResponseTypeEnum
  >(CategorySuccessResponseTypeEnum.Neutral);

  useEffect(() => {
    appDispatch(getCategories());
  }, []);

  const handleAddCategory = () => {
    if (selectedCategory){
      appDispatch(updateCategory({
        id: selectedCategory.id,
        name: newCategoryName,
        type: categoryType,
      }));
      setSelectedCategory(null);
    }else{
      appDispatch(createCategory({
        name: newCategoryName,
        type: categoryType,
      }));}
    setNewCategoryName('');
  };
  const handleSelectionChange = (category:CategorySuccessResponse) => {
    let name, type, selection;

    if (selectedCategory && selectedCategory.id === category.id){
      selection = null;
      name = '';
      type = CategorySuccessResponseTypeEnum.Neutral;
    }else{
      selection = category;
      name = category.name;
      type = category.type as CategorySuccessResponseTypeEnum;
    }
    setSelectedCategory(selection);
    setNewCategoryName(name);
    setCategoryType(type);

  };
  const initDefaultHandler = () => {
    appDispatch(initDefaultCategories());
  };

  if (isLoading){
    return <CircularProgress />;
  }

  return (
    <Box marginTop={2}>
      <Stack direction={'row'} gap={2}>
        <FormControl fullWidth>
          <TextField label="Введите название категории" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} fullWidth />
        </FormControl>

        <Select
          sx={{width: '250px'}}
          labelId="category-type-select-label"
          id="demo-simple-select"
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value as CategorySuccessResponseTypeEnum)}>
          <MenuItem value={CategorySuccessResponseTypeEnum.Neutral}>Нейтральное</MenuItem>
          <MenuItem value={CategorySuccessResponseTypeEnum.Productive}>Продуктивное</MenuItem>
          <MenuItem value={CategorySuccessResponseTypeEnum.Distracting}>Отвлекающее</MenuItem>
        </Select>

        <Button onClick={handleAddCategory}>{selectedCategory ? 'Изменить' : 'Добавить'}</Button>
      </Stack>

      <List>
        {categories.length === 0 && (
          <>
            <ListItemButton>
              <ListItemText primary="Нет категорий" />
            </ListItemButton>
            <Button onClick={initDefaultHandler}>Добавить категории по-умолчанию</Button>
          </>
        )}

        {categories.map((category) => (
          <ListItemButton
            key={category.id}
            selected={selectedCategory?.id === category.id}
            onClick={() => handleSelectionChange(category)}>
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
