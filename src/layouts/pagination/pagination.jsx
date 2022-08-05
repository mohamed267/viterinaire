import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import "./pagination.scss"


const PaginationComponent= ({pages , page , setPage})=>{

    return (
        <Pagination
        className="pagination"
          color="primary"
          variant="outlined"
          shape="circular"
          page={page }
          count={pages}
          // @ts-expect-error
          renderItem={
              (props2) =>
                  (
                      <PaginationItem {...props2}  disableRipple />
                  )
              
          }
          onChange={(event, value) => {
              setPage(value )
          }}
        />
      );
}


export default PaginationComponent