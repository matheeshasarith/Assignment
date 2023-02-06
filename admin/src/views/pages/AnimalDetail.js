import React, { useEffect, Fragment, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Card, CardHeader, CardTitle, Label, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { listEvents } from '../../redux/actions/events/eventActions'

const EventListScreen = ({ match, history }) => {

  const dispatch = useDispatch()

  const eventList = useSelector((state) => state.eventList)
  const { loading, error, events, page, pages } = eventList

  useEffect(() => {

    dispatch(listEvents())
  }, [
    dispatch,
    history
  ])

  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])


  const columns = [

    {
      name: 'NAME',
      selector: 'name',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'COLOR',
      selector: 'characteristics.color',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'DIET',
      selector: 'characteristics.diet',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'LOCATIONS',
      selector: 'locations',
      sortable: true,
      minWidth: '100px'
    }
    
  ]

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = events.filter(item => {
        console.log(item)
        const startsWith =

          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.locations.toString().startsWith(value.toString()) ||
          item.characteristics.color.toLowerCase().startsWith(value.toLowerCase()) ||
          item.characteristics.diet.toLowerCase().startsWith(value.toLowerCase())

        const includes =

          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.locations.toString().includes(value.toString()) ||
          item.characteristics.color.toLowerCase().includes(value.toLowerCase()) ||
          item.characteristics.diet.toLowerCase().includes(value.toLowerCase()) 

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })

      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 12 : events.length / 12 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>ANIMAL DETAILS</CardTitle>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={12}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : events}
        />
      </Card>
    </Fragment>
  )
}

export default EventListScreen
