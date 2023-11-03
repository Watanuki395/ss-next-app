import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)`
  border: none;
  color: inherit;
  //backgroundColor: 'rgba(20, 19, 19, 0.082)',

  & .MuiDataGrid-main {
    color: ${({ theme }) => theme.text};
  }

  & .MuiTablePagination-root {
    color: ${({ theme }) => theme.text};
  }

  & .MuiDataGrid-booleanCell {
    color: ${({ theme }) => theme.text};
  }

  & .MuiDataGrid-cell:focus {
    outline: ${({ theme }) => theme.text};
  }

  & .MuiButtonBase-root {
    color: ${({ theme }) => theme.text};
  }

  & .MuiDataGrid-selectedRowCount {
    color: ${({ theme }) => theme.text};
  }

  & .MuiCheckbox-root.Mui-checked {
    color: ${({ theme }) => theme.text};
  }

  /* & .MuiButtonBase-root.MuiIconButton-root.Mui-disabled{
            color: ${({ theme }) => theme.text};
            }
             */
`;
