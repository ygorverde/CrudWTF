import { Button, Table } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import dateFormat from 'dateformat';

export function TableAntd() {
  const [ services, setServices ] = useState([]);
  const [ pagination, setPagination ] = useState({current: 1, pageSize: 5, total: 0});
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const arrayTableServices = [];
    setLoading(true)
    api.get(`/services?page=${1}`).then(resp => {
      resp.data.data.map(service => {
        formatDate(service)
        return arrayTableServices.push({...service, key: service.id})
      })
      setServices(arrayTableServices);
      setPagination({current: 1, pageSize: resp.data.limit, total: resp.data.count})
      setLoading(false)
    })
  }, [])

  async function getServices(pagination) {
    const services = await api.get(`/services?page=${pagination.current}`);
    const arrayTableServices = [];
    await services.data.data.map(service => {
      formatDate(service)
      return arrayTableServices.push({...service, key: service.id})
    })
    setServices(arrayTableServices);
    setPagination({...pagination, total: services.data.count})
  }

  function formatDate(service) {
    return service.date_exec = dateFormat(service.date_exec, 'dd/mm/yyyy')
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: 'client', key: 'client' },
    { title: 'Técnico', dataIndex: 'user', key: 'user' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Data de Execução', dataIndex: 'date_exec', key: 'date_exec' },
    { title: 'Ações', key: 'operation', render: () => <Button onClick={() => window.print()}><PrinterOutlined /></Button> },
  ];

   function handleTableChange(pagination) {
    getServices(pagination)
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender: record => <p>{record.observation}</p>,
      rowExpandable: record => record.observation !== '' }}
      pagination={pagination}
      onChange={handleTableChange}
      dataSource={services}
      loading={loading}
      tableLayout={`fixed`}
    />
  );
}