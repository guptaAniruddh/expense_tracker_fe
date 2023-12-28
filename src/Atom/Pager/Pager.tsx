import { Pagination } from "rsuite";
import { PagerProps } from "./PagerProps";
const Pager = ({total,activePage,handlePageChange,pages}:PagerProps)=>{
    return (
        <Pagination
        prev
        last
        next
        first
        total={total}
        size="md"
        pages={pages}
        activePage={activePage}
        onChangePage={(page)=>handlePageChange(page)}
      />
      
    )
}
export default Pager;