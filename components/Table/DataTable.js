import { esES } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export function DataTable({
  columns,
  rows,
  checkboxSelection,
  pageSize,
  cHeight,
  toolBar,
}) {
  return (
    <Box sx={{ height: cHeight ? cHeight : 500, width: "100%" }}>
      <DataGrid
        checkboxSelection={checkboxSelection ? checkboxSelection : false}
        //getRowId={(row) => row.id_prd}
        rows={rows ? rows : undefined}
        columns={columns ? columns : undefined}
        loading={rows.length === 0}
        pageSize={pageSize ? pageSize : 10}
        rowsPerPageOptions={[pageSize ? pageSize : 10]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: toolBar ? GridToolbar : "",
        }}
      />
    </Box>
  );
}
