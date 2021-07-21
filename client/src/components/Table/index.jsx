import { Button, Table, Row, Col, DatePicker, Input } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';
import api from '../../services/api';

import dateFormat from 'dateformat';
import { useEffect } from 'react';

const { RangePicker } = DatePicker;
const { Search } = Input;

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'client', key: 'client' },
  { title: 'Técnico', dataIndex: 'user', key: 'user' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
  { title: 'Data de Execução', dataIndex: 'date_exec', key: 'date_exec' },
  { title: 'Ações', key: 'operation', render: () => <Button onClick={() => window.print()}><PrinterOutlined /></Button> },
];

export function TableAntd() {
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([]); 
  const [client, setClient] = useState('');

  function formatDate(service) {
    return service.date_exec = dateFormat(service.date_exec, 'dd/mm/yyyy')
  }

  useEffect(() => {
    const newdate = new Date()
    const dat = moment(newdate).format('YYYY-MM-DD')
    const today = [dat, dat]
    setLoading(true)
      api.get(`/services?page=${1}&date=${today}&client=${''}`).then(resp => {
        const arrayTableServices = [];
        resp.data.data.map(service => {
          formatDate(service)
          return arrayTableServices.push({ ...service, key: service.id })
        })
        setDate(today)
        setServices(arrayTableServices)
        setPagination({current: 1, pageSize: 5, total: resp.data.count})
        setLoading(false) 
      })
  }, [])

  async function getServices(pagination, dateString) {
    setLoading(true)
    const services = await api.get(`/services?page=${pagination.current}&date=${dateString}&client=${client}`);
    const arrayTableServices = [];
    services.data.data.map(service => {
      formatDate(service)
      return arrayTableServices.push({ ...service, key: service.id })
    })
    setDate(dateString)
    setPagination({ ...pagination, total: services.data.count })
    setServices(arrayTableServices);
    setLoading(false);
  }
  
  function handlePageChange(pagination) {
    getServices(pagination, date)
  }

  async function handleDateChange(dateString) {
    getServices({ current: 1, pageSize: 5, total: 0 }, dateString)
  }

  async function filterByName(e) {
    await getServices({ current: 1, pageSize: 5, total: 0 }, date)
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={6} className="gutter-row"><div>
          <RangePicker format={`YYYY-MM-DD`} onChange={(date, dateString) => handleDateChange(dateString)} 
          defaultValue={[moment(), moment()]}
          />
        </div>
        </Col>
        <Col span={6} className="gutter-row">
          <div><Search placeholder="Filtrar por nome do cliente" onSearch={filterByName} enterButton onChange={e => setClient(e.target.value)}/></div>
        </Col>
        <Col span={6} className="gutter-row"><div><Input placeholder="Filtrar por técnico" /></div></Col>
        <Col span={6} className="gutter-row"><div><Input placeholder="Filtrar por tipo" /></div></Col>
      </Row>
      <br />
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{
          expandedRowRender: record => <p>{record.observation}</p>,
          rowExpandable: record => record.observation !== ''
        }}
        pagination={pagination}
        onChange={handlePageChange}
        dataSource={services}
        loading={loading}
        tableLayout={`fixed`}
      />
    </div>
  );
}