import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, InputLabel, MenuItem,
  Select, SelectChangeEvent, TextField
} from "@mui/material";
import {useState} from "react";

interface DialogProps{selectedCategory:{
  id: number,
  name: string
}}

export const DialogAddCategory = (selectedCategory:DialogProps) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [age, setAge] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return(
    <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
      <DialogTitle>
        {selectedCategory === null ? "Add Root Category" : "Add Subcategory"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          fullWidth />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}>
            <MenuItem value={0}>Нейтральное</MenuItem>
            <MenuItem value={1}>Продуктивное</MenuItem>
            <MenuItem value={2}>Токсичное</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
        <Button onClick={handleAddCategory}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
