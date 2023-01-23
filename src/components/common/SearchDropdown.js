import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function SearchDropdown(
    {dropdowndata,
    onChange,
    values,
    handleDelete
}
) {
  return (
    <>
      <Autocomplete
      fullWidth
        disablePortal
        id="combo-box-demo"
        size="small"
        onChange={(e, newval)=> onChange(newval)}
        options={dropdowndata}
        renderInput={(params) => <TextField {...params} fullWidth/>}
      /> 

      <Stack direction="row" spacing={1} sx={{marginTop:'10px'}}>
      {
        values.length>0 &&values.map((item,index)=>{
          return (
          <Chip
          avatar={
            <DeleteIcon
              sx={{
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => handleDelete(item)}
            />
          }
          
          variant="outlined"
          label={item}
        />
        )
        
        })
      }
      </Stack>
    </>
  );
}


export default SearchDropdown